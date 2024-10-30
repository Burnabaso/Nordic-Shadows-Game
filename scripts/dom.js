const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuContent = document.getElementById("mobile-menu-content");
mobileMenu?.addEventListener("click",function(){
    mobileMenuContent?.classList.toggle("hidden")
})