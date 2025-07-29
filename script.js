// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const loadMoreBtn = document.getElementById("load-more-btn")
  const loadMoreNarguileBtn = document.getElementById("load-more-narguile-btn")
  const reservationForm = document.getElementById("reservation-form")

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")

    // Update aria-expanded
    const isExpanded = navMenu.classList.contains("active")
    navToggle.setAttribute("aria-expanded", isExpanded)
    navToggle.setAttribute("aria-label", isExpanded ? "Fechar menu" : "Abrir menu")
  })

  // Mobile dropdown functionality
  const dropdowns = document.querySelectorAll(".dropdown")
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle")
    const menu = dropdown.querySelector(".dropdown-menu")

    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        // Only prevent default on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault()

          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              const otherMenu = otherDropdown.querySelector(".dropdown-menu")
              const otherToggle = otherDropdown.querySelector(".dropdown-toggle")
              if (otherMenu && otherToggle) {
                otherMenu.classList.remove("active")
                otherDropdown.classList.remove("active")
                otherToggle.setAttribute("aria-expanded", "false")
              }
            }
          })

          // Toggle current dropdown
          const isActive = menu.classList.contains("active")
          menu.classList.toggle("active")
          dropdown.classList.toggle("active")
          toggle.setAttribute("aria-expanded", !isActive)
        }
      })
    }
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
      navToggle.setAttribute("aria-expanded", "false")
      navToggle.setAttribute("aria-label", "Abrir menu")

      // Close all dropdowns
      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-menu")
        const toggle = dropdown.querySelector(".dropdown-toggle")
        if (menu && toggle) {
          menu.classList.remove("active")
          dropdown.classList.remove("active")
          toggle.setAttribute("aria-expanded", "false")
        }
      })
    })
  })

  // Active section highlighting
  function updateActiveSection() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`[data-section="${sectionId}"]`)

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach((link) => link.classList.remove("active"))
        // Add active class to current section link
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  }

  // Scroll event listener for active section
  window.addEventListener("scroll", updateActiveSection)

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Dropdown items scroll functionality
  const dropdownItems = document.querySelectorAll(".dropdown-item")
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("data-scroll")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Show the category if it's hidden
        const categoryElement = targetElement.closest(".bebidas-category")
        if (categoryElement && categoryElement.classList.contains("hidden")) {
          revealCategory(categoryElement)
        }

        // Scroll to the category
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 300)
      }

      // Close mobile menu if open
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
      navToggle.setAttribute("aria-expanded", "false")

      // Close all dropdowns
      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-menu")
        const toggle = dropdown.querySelector(".dropdown-toggle")
        if (menu && toggle) {
          menu.classList.remove("active")
          dropdown.classList.remove("active")
          toggle.setAttribute("aria-expanded", "false")
        }
      })
    })
  })

  // Function to reveal a category with animation
  function revealCategory(categoryElement) {
    categoryElement.classList.remove("hidden")
    categoryElement.classList.add("revealing")

    setTimeout(() => {
      categoryElement.classList.remove("revealing")
      categoryElement.classList.add("revealed")
    }, 50)
  }

  // Function to show hidden cards in a section
  function showHiddenCards(sectionId) {
    const section = document.getElementById(sectionId)
    if (section) {
      const hiddenCards = section.querySelectorAll(".card.hidden")
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("hidden")
        }, index * 100)
      })
    }
  }

  // Load more narguilé functionality
  if (loadMoreNarguileBtn) {
    loadMoreNarguileBtn.addEventListener("click", function () {
      showHiddenCards("narguile")
      this.style.display = "none"
    })
  }

  // Load more drinks functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const hiddenCategories = document.querySelectorAll("#bebidas .bebidas-category.hidden")

      hiddenCategories.forEach((category, index) => {
        setTimeout(() => {
          revealCategory(category)
        }, index * 200)
      })

      // Hide the button after revealing all categories
      if (hiddenCategories.length > 0) {
        setTimeout(
          () => {
            this.style.display = "none"
          },
          hiddenCategories.length * 200 + 500,
        )
      }
    })
  }

  // Load more combos functionality
  const loadMoreCombosBtn = document.getElementById("load-more-combos-btn")
  if (loadMoreCombosBtn) {
    loadMoreCombosBtn.addEventListener("click", function () {
      const hiddenCategories = document.querySelectorAll("#combos .bebidas-category.hidden")

      hiddenCategories.forEach((category, index) => {
        setTimeout(() => {
          revealCategory(category)
        }, index * 200)
      })

      // Hide the button after revealing all categories
      if (hiddenCategories.length > 0) {
        setTimeout(
          () => {
            this.style.display = "none"
          },
          hiddenCategories.length * 200 + 500,
        )
      }
    })
  }

  // Form submission
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = {}

      for (const [key, value] of formData.entries()) {
        data[key] = value
      }

      // Simple validation
      if (!data.nome || !data.email || !data.telefone || !data.data || !data.quantidade) {
        alert("Por favor, preencha todos os campos obrigatórios.")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".form-submit")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Reserva enviada com sucesso! Entraremos em contato em breve.")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add subtle flicker effect to titles (reduced)
  function addFlickerEffect() {
    const neonElements = document.querySelectorAll(".neon-text-cyan, .neon-text-purple")

    neonElements.forEach((element) => {
      setInterval(() => {
        if (Math.random() > 0.98) {
          // Reduced frequency
          element.style.opacity = "0.9"
          setTimeout(() => {
            element.style.opacity = "1"
          }, 50)
        }
      }, 3000) // Increased interval
    })
  }

  // Initialize flicker effect
  addFlickerEffect()

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe sections for scroll animations
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "all 0.8s ease"
    observer.observe(section)
  })

  // Handle window resize for dropdown behavior
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      // Reset mobile dropdown states on desktop
      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(".dropdown-menu")
        const toggle = dropdown.querySelector(".dropdown-toggle")
        if (menu && toggle) {
          menu.classList.remove("active")
          dropdown.classList.remove("active")
          toggle.setAttribute("aria-expanded", "false")
        }
      })
    }
  })
})

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Enhanced particle system with varied sizes and more particles
function createNeonParticles() {
  const hero = document.querySelector(".hero-section")

  if (!hero) return

  // Create 80 particles with varied sizes and animations
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div")

    // Random size between 1px and 4px
    const size = Math.random() * 3 + 1

    particle.style.position = "absolute"
    particle.style.width = size + "px"
    particle.style.height = size + "px"
    particle.style.background = Math.random() > 0.5 ? "#00ffff" : "#8a2be2"
    particle.style.borderRadius = "50%"

    // Varied glow intensity based on size
    const glowIntensity = size * 2
    particle.style.boxShadow = `0 0 ${glowIntensity}px ${particle.style.background}`

    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Varied opacity based on size
    particle.style.opacity = (size / 4) * 0.7

    // Different animation speeds and types
    const animationType = Math.random()
    let animation

    if (animationType < 0.33) {
      animation = `float ${4 + Math.random() * 4}s ease-in-out infinite`
    } else if (animationType < 0.66) {
      animation = `float-slow ${6 + Math.random() * 4}s ease-in-out infinite`
    } else {
      animation = `float-fast ${2 + Math.random() * 3}s ease-in-out infinite`
    }

    particle.style.animation = animation

    // Random delay for more natural movement
    particle.style.animationDelay = Math.random() * 2 + "s"

    hero.appendChild(particle)
  }

  // Add some larger, slower moving particles for depth
  for (let i = 0; i < 15; i++) {
    const largePart = document.createElement("div")
    const size = Math.random() * 2 + 5 // 5-7px

    largePart.style.position = "absolute"
    largePart.style.width = size + "px"
    largePart.style.height = size + "px"
    largePart.style.background = Math.random() > 0.5 ? "#00ffff" : "#8a2be2"
    largePart.style.borderRadius = "50%"
    largePart.style.boxShadow = `0 0 ${size * 3}px ${largePart.style.background}`
    largePart.style.left = Math.random() * 100 + "%"
    largePart.style.top = Math.random() * 100 + "%"
    largePart.style.opacity = "0.3"
    largePart.style.animation = `float-slow ${8 + Math.random() * 6}s ease-in-out infinite`
    largePart.style.animationDelay = Math.random() * 3 + "s"

    hero.appendChild(largePart)
  }
}

// Initialize enhanced particle system
createNeonParticles()
