import { Scene, MeshBuilder, StandardMaterial, Color3, Vector3, Texture } from "@babylonjs/core";

export default class TherapyRoom {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.createRoom();
    this.createUserChair();
    this.addDecorations();
  }

  private createRoom() {
    // Create floor
    const floor = MeshBuilder.CreateGround("floor", {
      width: 12,
      height: 12
    }, this.scene);
    
    const floorMaterial = new StandardMaterial("floorMaterial", this.scene);
    
    // Try to use wood texture, fallback to solid color
    try {
      floorMaterial.diffuseTexture = new Texture("/textures/wood.jpg", this.scene);
    } catch {
      floorMaterial.diffuseColor = new Color3(0.6, 0.4, 0.2); // Wood brown
    }
    
    floor.material = floorMaterial;
    floor.position = new Vector3(0, 0, 0);

    // Create walls
    this.createWalls();
    
    // Create ceiling
    const ceiling = MeshBuilder.CreateGround("ceiling", {
      width: 12,
      height: 12
    }, this.scene);
    ceiling.position = new Vector3(0, 3, 0);
    ceiling.rotation = new Vector3(Math.PI, 0, 0);
    
    const ceilingMaterial = new StandardMaterial("ceilingMaterial", this.scene);
    ceilingMaterial.diffuseColor = new Color3(0.95, 0.95, 0.95); // Light gray
    ceiling.material = ceilingMaterial;
  }

  private createWalls() {
    // Back wall
    const backWall = MeshBuilder.CreateBox("backWall", {
      width: 12,
      height: 3,
      depth: 0.1
    }, this.scene);
    backWall.position = new Vector3(0, 1.5, -6);

    // Side walls
    const leftWall = MeshBuilder.CreateBox("leftWall", {
      width: 0.1,
      height: 3,
      depth: 12
    }, this.scene);
    leftWall.position = new Vector3(-6, 1.5, 0);

    const rightWall = MeshBuilder.CreateBox("rightWall", {
      width: 0.1,
      height: 3,
      depth: 12
    }, this.scene);
    rightWall.position = new Vector3(6, 1.5, 0);

    // Wall material - calming color
    const wallMaterial = new StandardMaterial("wallMaterial", this.scene);
    wallMaterial.diffuseColor = new Color3(0.9, 0.95, 0.9); // Light mint green
    
    backWall.material = wallMaterial;
    leftWall.material = wallMaterial;
    rightWall.material = wallMaterial;
  }

  private createUserChair() {
    // Chair seat for user
    const userChairSeat = MeshBuilder.CreateBox("userChairSeat", {
      width: 1.5,
      height: 0.1,
      depth: 1.5
    }, this.scene);
    userChairSeat.position = new Vector3(0, 0.5, 2);

    // Chair back
    const userChairBack = MeshBuilder.CreateBox("userChairBack", {
      width: 1.5,
      height: 1.2,
      depth: 0.1
    }, this.scene);
    userChairBack.position = new Vector3(0, 1.1, 1.3);

    // Chair arms
    const leftArm = MeshBuilder.CreateBox("leftArm", {
      width: 0.1,
      height: 0.6,
      depth: 1.5
    }, this.scene);
    leftArm.position = new Vector3(-0.7, 0.8, 2);

    const rightArm = MeshBuilder.CreateBox("rightArm", {
      width: 0.1,
      height: 0.6,
      depth: 1.5
    }, this.scene);
    rightArm.position = new Vector3(0.7, 0.8, 2);

    // Chair material
    const chairMaterial = new StandardMaterial("userChairMaterial", this.scene);
    chairMaterial.diffuseColor = new Color3(0.5, 0.5, 0.7); // Comfortable blue-gray
    
    userChairSeat.material = chairMaterial;
    userChairBack.material = chairMaterial;
    leftArm.material = chairMaterial;
    rightArm.material = chairMaterial;
  }

  private addDecorations() {
    // Add a small table between chairs
    const table = MeshBuilder.CreateCylinder("table", {
      height: 0.6,
      diameter: 1.2
    }, this.scene);
    table.position = new Vector3(1.8, 0.3, 0);

    const tableMaterial = new StandardMaterial("tableMaterial", this.scene);
    tableMaterial.diffuseColor = new Color3(0.4, 0.3, 0.2); // Dark wood
    table.material = tableMaterial;

    // Add some plants for a calming atmosphere
    this.createPlant(new Vector3(-3, 0, -4));
    this.createPlant(new Vector3(3, 0, -4));
    
    // Add a bookshelf
    this.createBookshelf(new Vector3(-4, 0, -5.8));
    
    // Add artwork/certificates on wall
    this.createWallDecoration(new Vector3(0, 2, -5.95));
  }

  private createPlant(position: Vector3) {
    // Pot
    const pot = MeshBuilder.CreateCylinder("pot", {
      height: 0.6,
      diameter: 0.8,
      diameterTop: 0.9
    }, this.scene);
    pot.position = position;

    const potMaterial = new StandardMaterial("potMaterial", this.scene);
    potMaterial.diffuseColor = new Color3(0.6, 0.3, 0.2); // Terracotta
    pot.material = potMaterial;

    // Plant leaves (simplified)
    for (let i = 0; i < 5; i++) {
      const leaf = MeshBuilder.CreateSphere("leaf", { diameter: 0.4 }, this.scene);
      leaf.position = new Vector3(
        position.x + (Math.random() - 0.5) * 0.8,
        position.y + 0.6 + Math.random() * 0.8,
        position.z + (Math.random() - 0.5) * 0.8
      );

      const leafMaterial = new StandardMaterial("leafMaterial", this.scene);
      leafMaterial.diffuseColor = new Color3(0.2, 0.6, 0.2); // Green
      leaf.material = leafMaterial;
    }
  }

  private createBookshelf(position: Vector3) {
    const bookshelf = MeshBuilder.CreateBox("bookshelf", {
      width: 2,
      height: 2.5,
      depth: 0.4
    }, this.scene);
    bookshelf.position = position.add(new Vector3(0, 1.25, 0));

    const bookshelfMaterial = new StandardMaterial("bookshelfMaterial", this.scene);
    bookshelfMaterial.diffuseColor = new Color3(0.5, 0.3, 0.2); // Dark wood
    bookshelf.material = bookshelfMaterial;

    // Add some books
    for (let shelf = 0; shelf < 4; shelf++) {
      for (let book = 0; book < 8; book++) {
        const bookMesh = MeshBuilder.CreateBox("book", {
          width: 0.15,
          height: 0.4,
          depth: 0.05
        }, this.scene);
        
        bookMesh.position = new Vector3(
          position.x - 0.75 + (book * 0.2),
          position.y + 0.5 + (shelf * 0.5),
          position.z + 0.15
        );

        const bookMaterial = new StandardMaterial("bookMaterial", this.scene);
        const colors = [
          new Color3(0.8, 0.2, 0.2), // Red
          new Color3(0.2, 0.2, 0.8), // Blue  
          new Color3(0.2, 0.6, 0.2), // Green
          new Color3(0.6, 0.4, 0.2)  // Brown
        ];
        bookMaterial.diffuseColor = colors[Math.floor(Math.random() * colors.length)];
        bookMesh.material = bookMaterial;
      }
    }
  }

  private createWallDecoration(position: Vector3) {
    // Certificate frame
    const frame = MeshBuilder.CreateBox("frame", {
      width: 1.5,
      height: 1,
      depth: 0.05
    }, this.scene);
    frame.position = position;

    const frameMaterial = new StandardMaterial("frameMaterial", this.scene);
    frameMaterial.diffuseColor = new Color3(0.8, 0.7, 0.4); // Gold frame
    frame.material = frameMaterial;

    // Certificate background
    const certificate = MeshBuilder.CreateBox("certificate", {
      width: 1.3,
      height: 0.8,
      depth: 0.02
    }, this.scene);
    certificate.position = position.add(new Vector3(0, 0, 0.02));

    const certMaterial = new StandardMaterial("certMaterial", this.scene);
    certMaterial.diffuseColor = new Color3(0.95, 0.95, 0.9); // Off-white
    certificate.material = certMaterial;
  }
}
