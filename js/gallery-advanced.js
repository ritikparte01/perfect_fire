/**
 * Enhanced Dynamic Gallery with API Support
 * Can fetch images from server or use fallback list
 */

class AdvancedDynamicGallery {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            imagesFolder: 'PFIMAGES',
            apiEndpoint: 'js/get-images.php',
            useFallback: true,
            lazyLoad: true,
            ...options
        };
        this.imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        this.images = [];
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadImages();
            this.renderGallery();
            this.initializeFancybox();
            this.initializeLazyLoading();
        } catch (error) {
            console.error('Error initializing gallery:', error);
            this.showErrorMessage();
        }
    }
    
    async loadImages() {
        try {
            // Try to fetch from API/PHP first
            if (this.options.apiEndpoint) {
                try {
                    const response = await fetch(this.options.apiEndpoint);
                    if (response.ok) {
                        const serverImages = await response.json();
                        if (serverImages && serverImages.length > 0) {
                            this.images = serverImages;
                            return;
                        }
                    }
                } catch (error) {
                    console.warn('Server API not available, using fallback:', error);
                }
            }
            
            // Fallback to predefined list
            if (this.options.useFallback) {
                await this.loadFallbackImages();
            }
            
            // Validate images
            this.images = await this.validateImages(this.images);
            
        } catch (error) {
            console.error('Error loading images:', error);
            throw error;
        }
    }
    
    async loadFallbackImages() {
        const imageFiles = [
            "WhatsApp Image 2025-11-07 at 1.17.32 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.38 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM (3).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM (4).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM (5).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.41 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.42 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (10).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (11).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (12).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (13).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (14).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (15).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (16).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (17).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (18).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (3).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (4).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (6).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (7).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (8).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM (9).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.43 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (1) 2.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (10).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (11).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (12).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (13).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (14).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (3).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (4).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (6).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (7).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (8).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM (9).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM 2.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.44 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (10).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (11).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (12).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (3).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (4).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (5).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (6).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (7).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (8).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM (9).jpeg",
            "WhatsApp Image 2025-11-07 at 1.17.45 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.29 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.29 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.30 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.30 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.31 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.31 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.31 PM (3).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.31 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.32 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.32 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.32 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.33 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.33 PM (2).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.33 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.34 PM (1).jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.34 PM.jpeg",
            "WhatsApp Image 2025-11-07 at 1.23.35 PM.jpeg",
            "highlight.jpeg",
            "home1.jpeg",
            "home2.jpeg",
            "home3.jpeg",
            "home4.jpeg",
            "home5.jpeg",
            "home6.jpeg"
        ];
        
        this.images = imageFiles.map((filename, index) => ({
            src: `${this.options.imagesFolder}/${filename}`,
            alt: `Gallery Image ${index + 1}`,
            title: filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, ''),
            category: 'category-1'
        }));
    }
    
    async validateImages(images) {
        const validImages = [];
        const batchSize = 5;
        
        for (let i = 0; i < images.length; i += batchSize) {
            const batch = images.slice(i, i + batchSize);
            const batchPromises = batch.map(image => 
                this.checkImageExists(image.src).then(() => image).catch(() => null)
            );
            
            const batchResults = await Promise.all(batchPromises);
            validImages.push(...batchResults.filter(Boolean));
        }
        
        return validImages;
    }
    
    checkImageExists(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
            // Add timeout to avoid hanging
            setTimeout(() => reject(false), 5000);
            img.src = src;
        });
    }
    
    createGalleryItem(image, index) {
        const lazyLoading = this.options.lazyLoad ? 'loading="lazy"' : '';
        return `
            <div class="gallery-block-five col-xl-3 col-lg-6 col-md-4 col-sm-6 element-item ${image.category}" data-category="${image.category}">
                <div class="inner-box">                            
                    <div class="image">
                        <img src="${image.src}" alt="${image.alt}" ${lazyLoading} style="width: 100%; height: 250px; object-fit: cover;">
                        <div class="overlay">
                            <div class="zoom-btn">
                                <a data-fancybox="gallery" href="${image.src}" data-caption="${image.title}">
                                    <span class="flaticon-expand"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>                            
            </div>
        `;
    }
    
    renderGallery() {
        if (!this.container) {
            console.error('Gallery container not found');
            return;
        }
        
        if (this.images.length === 0) {
            this.showNoImagesMessage();
            return;
        }
        
        const galleryHTML = this.images
            .map((image, index) => this.createGalleryItem(image, index))
            .join('');
            
        this.container.innerHTML = galleryHTML;
        
        // Initialize any masonry or isotope layout
        this.initializeLayout();
    }
    
    initializeLayout() {
        // Wait for images to load before initializing layout
        setTimeout(() => {
            if (typeof $.fn.isotope !== 'undefined') {
                const $container = $('.sortable-masonry-two');
                if ($container.length) {
                    $container.isotope({
                        itemSelector: '.gallery-block-five',
                        layoutMode: 'fitRows',
                        percentPosition: true
                    });
                }
            }
        }, 500);
    }
    
    initializeFancybox() {
        if (typeof $.fancybox !== 'undefined') {
            $('[data-fancybox="gallery"]').fancybox({
                buttons: ["zoom", "share", "slideShow", "fullScreen", "download", "thumbs", "close"],
                thumbs: {
                    autoStart: false,
                    hideOnCloseBtnClick: true
                },
                loop: true,
                protect: true,
                animationEffect: "fade",
                transitionEffect: "slide"
            });
        }
    }
    
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    showErrorMessage() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="alert alert-warning" style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px;">
                        <h4 style="color: #856404; margin-bottom: 15px;">Unable to load gallery images</h4>
                        <p style="color: #856404; margin: 0;">There was an error loading the gallery. Please check that the images are available.</p>
                    </div>
                </div>
            `;
        }
    }
    
    showNoImagesMessage() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="alert alert-info" style="background: #d1ecf1; border: 1px solid #b8daff; padding: 20px; border-radius: 8px;">
                        <h4 style="color: #0c5460; margin-bottom: 15px;">No images found</h4>
                        <p style="color: #0c5460; margin: 0;">No images were found in the gallery folder.</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Public methods
    async refresh() {
        await this.init();
    }
    
    addImages(newImages) {
        this.images = [...this.images, ...newImages];
        this.renderGallery();
        this.initializeFancybox();
    }
    
    filterByCategory(category = null) {
        if (typeof $.fn.isotope !== 'undefined') {
            const filterValue = category ? `.${category}` : '*';
            $('.sortable-masonry-two').isotope({ filter: filterValue });
        }
    }
    
    searchImages(searchTerm) {
        if (!searchTerm) {
            this.renderGallery();
            return;
        }
        
        const filteredImages = this.images.filter(image => 
            image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.alt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const originalImages = this.images;
        this.images = filteredImages;
        this.renderGallery();
        this.images = originalImages;
    }
}

// Initialize the advanced gallery when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.galleryInstance = new AdvancedDynamicGallery('dynamic-gallery-container', {
            lazyLoad: true,
            useFallback: true
        });
    }, 500);
});