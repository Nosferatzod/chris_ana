        // Create floating hearts
        function createHearts() {
            const container = document.getElementById('floatingHearts');
            const heartCount = 20;
            
            for (let i = 0; i < heartCount; i++) {
                const heart = document.createElement('div');
                heart.innerHTML = '❤';
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
                heart.style.animationDuration = (Math.random() * 15 + 5) + 's';
                heart.style.animationDelay = Math.random() * 5 + 's';
                container.appendChild(heart);
            }
        }
        
        // Scroll animation
        function checkScroll() {
            const elements = document.querySelectorAll('.hidden');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('show');
                }
            });
        }
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Hide all memory pages first
                document.querySelectorAll('#memory1, #memory2, #memory3').forEach(page => {
                    page.style.display = 'none';
                });
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#home' || targetId === '#memories' || targetId === '#poems' || targetId === '#us') {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    // Show the selected memory page
                    document.querySelector(targetId).style.display = 'block';
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Heart button animation
        document.getElementById('heartBtn').addEventListener('click', function() {
            this.classList.add('animate__animated', 'animate__heartBeat');
            setTimeout(() => {
                document.getElementById('memories').scrollIntoView({ behavior: 'smooth' });
            }, 500);
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
        });
        
        // Initialize
        window.addEventListener('load', () => {
            createHearts();
            checkScroll();
        });
        
        window.addEventListener('scroll', checkScroll);

          // (Mantenha todos os scripts anteriores)

        // (Mantenha todos os scripts anteriores)

        // Novo script para a galeria de fotos
        let currentPhotoIndex = 1;
        const totalPhotos = 8;
        const music = document.getElementById('backgroundMusic');
        let isMusicPlaying = false;
        
        // Array com os caminhos das suas fotos
        const photoPaths = [
            './imgs/img01.webp',
            './imgs/img02.webp',
            './imgs/img03.webp',
            './imgs/img04.webp',
            './imgs/img05.webp',
            './imgs/img06.webp',
            './imgs/img07.webp',
            './imgs/img08.webp'
        ];
        
        function openPhotoModal(index) {
            currentPhotoIndex = index;
            document.getElementById('modalPhoto').src = photoPaths[index - 1];
            document.getElementById('photoCount').textContent = `${index}/${totalPhotos}`;
            document.getElementById('photoModal').style.display = 'flex';
            
            // Inicia a música automaticamente
            music.currentTime = 0;
            music.play();
            isMusicPlaying = true;
            document.getElementById('musicBtn').innerHTML = '<i class="fas fa-pause"></i>';
        }
        
        function closePhotoModal() {
            document.getElementById('photoModal').style.display = 'none';
            music.pause();
            isMusicPlaying = false;
        }
        
        function toggleMusic() {
            if (isMusicPlaying) {
                music.pause();
                document.getElementById('musicBtn').innerHTML = '<i class="fas fa-music"></i>';
            } else {
                music.play();
                document.getElementById('musicBtn').innerHTML = '<i class="fas fa-pause"></i>';
            }
            isMusicPlaying = !isMusicPlaying;
        }
        
        function navigatePhotos(direction) {
            currentPhotoIndex += direction;
            
            if (currentPhotoIndex < 1) currentPhotoIndex = totalPhotos;
            if (currentPhotoIndex > totalPhotos) currentPhotoIndex = 1;
            
            document.getElementById('modalPhoto').src = photoPaths[currentPhotoIndex - 1];
            document.getElementById('photoCount').textContent = `${currentPhotoIndex}/${totalPhotos}`;
            
            // Reinicia a música se estiver tocando
            if (isMusicPlaying) {
                music.currentTime = 0;
                music.play();
            }
        }
        
        // Navegação pelas fotos com teclado
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('photoModal');
            if (modal.style.display === 'flex') {
                if (e.key === 'ArrowRight') {
                    navigatePhotos(1);
                } else if (e.key === 'ArrowLeft') {
                    navigatePhotos(-1);
                } else if (e.key === 'Escape') {
                    closePhotoModal();
                }
            }
        });