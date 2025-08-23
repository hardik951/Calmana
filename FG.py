import cv2
from deepface import DeepFace
import sqlite3
import time
from collections import defaultdict

# Initialize SQLite database
conn = sqlite3.connect('emotion_data.db')
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS emotions
                  (timestamp TEXT, emotion TEXT, confidence REAL)''')
conn.commit()

# Tunables
TARGET_WIDTH = 640  # Resize frame for consistency
SMOOTHING_ALPHA = 1.0  # EMA smoothing factor (0 to 1)
FRAME_DELAY_MS = 20  # Delay in milliseconds to control frame rate

# Smoothed emotion tracking
smoothed_emotion = defaultdict(float)
last_emotion = None

cap = cv2.VideoCapture(0)  # Webcam
if not cap.isOpened():
    raise RuntimeError("Could not open webcam. Check CAMERA_INDEX.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("[ERROR] Failed to capture frame. Exiting...")
        break

    # Resize frame for better accuracy
    height = int(frame.shape[0] * TARGET_WIDTH / frame.shape[1])
    frame_resized = cv2.resize(frame, (TARGET_WIDTH, height))

    try:
        # Analyze emotion with alignment for better accuracy
        result = DeepFace.analyze(frame_resized, actions=['emotion'], enforce_detection=False, align=True)

        # Take the first result (assuming one face)
        if result:
            result = result[0]
            emotion = result['dominant_emotion']
            confidence = result['emotion'][emotion]

            # Apply smoothing to reduce jitter
            smoothed_emotion[emotion] = (SMOOTHING_ALPHA * confidence +
                                       (1 - SMOOTHING_ALPHA) * smoothed_emotion.get(emotion, 0))
            smoothed_emotion = dict(sorted(smoothed_emotion.items(), key=lambda x: x[1], reverse=True))
            dominant_smoothed = max(smoothed_emotion, key=smoothed_emotion.get)
            confidence_smoothed = smoothed_emotion[dominant_smoothed]

            # Update last emotion if confidence is significant
            if confidence_smoothed > 0.5:  # Threshold to avoid low-confidence changes
                last_emotion = dominant_smoothed

            # Store in database
            timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute("INSERT INTO emotions (timestamp, emotion, confidence) VALUES (?, ?, ?)",
                           (timestamp, last_emotion, confidence_smoothed))
            conn.commit()

            print(f"Emotion: {last_emotion}, Confidence: {confidence_smoothed:.2f}")

        else:
            print("No face detected")

    except Exception as e:
        print(f"[WARN] Emotion analysis failed: {str(e)}")
        continue

    # Display the frame
    cv2.imshow("Video", frame_resized)

    # Control frame rate and exit with 'q'
    if cv2.waitKey(FRAME_DELAY_MS) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
conn.close()
