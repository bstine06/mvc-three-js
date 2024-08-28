import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';

export default class Stage {
    constructor() {

        this.stage = new THREE.Object3D();

        const stageMaterial1 = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const stageMaterial2 = new THREE.MeshPhongMaterial({ color: 0x999999 })

        const stageFloorGeometry = new THREE.BoxGeometry(300, 10, 300);
        const stageFloor = new THREE.Mesh(stageFloorGeometry, stageMaterial1);
        stageFloor.receiveShadow = true;

        // Create Stage Walls
        const stageWallGeometry = new THREE.BoxGeometry(10,20,320);
        const stageWallLeft = new THREE.Mesh(stageWallGeometry, stageMaterial2);
        stageWallLeft.position.set(-155,5,0);
        stageWallLeft.receiveShadow = true;
        const stageWallRight = stageWallLeft.clone();
        stageWallRight.position.set(155,5,0);

        // Create Top & Bottom Stage Walls
        const stageWallTop = stageWallLeft.clone();
        stageWallTop.rotation.y = Math.PI / 2;
        stageWallTop.position.set(0,5,-155);
        const stageWallBottom = stageWallTop.clone();
        stageWallBottom.position.set(0,5,155);

        this.stage.add(stageFloor);
        this.stage.add(stageWallLeft);
        this.stage.add(stageWallRight);
        this.stage.add(stageWallTop);
        this.stage.add(stageWallBottom);

        const waterGeometry = new THREE.PlaneGeometry(1000, 1000);
const waterMaterial = new THREE.MeshStandardMaterial({
    color: 0x00aaff, // Water color
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.6,
    envMapIntensity: 1.0
});

const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
waterMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
waterMesh.receiveShadow = true;
this.stage.add(waterMesh);



    }

    getStage() {
        return this.stage;
    }
}
