const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuContent = document.getElementById("mobile-menu-content");
const logoScroll = document.getElementById("logo-scroll-top");
mobileMenu?.addEventListener("click",function(){
    mobileMenuContent?.classList.toggle("hidden")
})
logoScroll?.addEventListener("click",function(){
    window.scrollTo(0,0)
})