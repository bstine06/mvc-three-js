import * as THREE from 'three';

export default class ExplosionEffect {
    constructor(scene) {
        this.scene = scene;
    }

    create(position) {
        const particlesCount = 2500; // Number of particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);
        const initialSizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Random positions within a larger sphere
            const radius = Math.random() * 10; // Larger radius for bigger explosion
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);

            // Radial velocities with increased speed
            const speed = Math.random() * 10 + 5;
            velocities[i] = positions[i] * speed;
            velocities[i + 1] = positions[i + 1] * speed;
            velocities[i + 2] = positions[i + 2] * speed;

            // Colors and sizes
            colors[i] = Math.random(); // Random red component
            colors[i + 1] = Math.random(); // Random green component
            colors[i + 2] = Math.random(); // Random blue component
            sizes[i] = Math.random() * 5 + 2; // Larger sizes
            initialSizes[i / 3] = sizes[i]; // Store initial sizes for fading
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('initialSize', new THREE.BufferAttribute(initialSizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute vec3 velocity;
                attribute vec3 color;
                attribute float size;
                attribute float initialSize;
                uniform float time;
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    vColor = color;
                    vAlpha = 1.0 - (time / 2.0); // Fade alpha over 2 seconds
                    vec3 pos = position + velocity * time;
                    gl_PointSize = size * (1.0 - gl_Position.z / 20.0); // Scale size based on depth
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    gl_FragColor = vec4(vColor, vAlpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        particles.position.copy(position);

        this.scene.add(particles);

        // Animate particles for a total of 2 seconds
        const duration = 2; // Duration of the explosion in seconds
        const startTime = Date.now();
        const animate = () => {
            material.uniforms.time.value = (Date.now() - startTime) / 1000; // Time in seconds
            if (material.uniforms.time.value < duration) {
                requestAnimationFrame(animate);
            } else {
                this.scene.remove(particles); // Remove particles after duration
            }
        };
        animate();
    }
}
