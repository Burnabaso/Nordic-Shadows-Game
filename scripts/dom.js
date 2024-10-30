const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuContent = document.getElementById("mobile-menu-content");
var click=false;
mobileMenu?.addEventListener("click",function(){
    mobileMenuContent?.classList.toggle("hidden")
})