let body = document.querySelector("body");
let bodyContent = body.innerHTML;


body.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-center pt-4">
    <div class="container">
        <img id="logo" src="/drinkies/images/drinkies-logo.svg" alt="Drinkies">
        
        <div class="btn ms-auto order-lg-last link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasTop">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        
        <button class="navbar-toggler order-lg-last" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto gap-4">
                <li class="nav-item">
                    <a class="link" aria-current="page" href="/drinkies">Home</a>
                </li>
                <li class="nav-item">
                    <a class="link" aria-current="page" href="/drinkies/explore">Explore</a>
                </li>
                <li class="nav-item">
                    <a class="link" aria-current="page" href="/drinkies/aboutus">About</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
` + bodyContent + `
<footer>
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="/drinkies" class="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="/drinkies/explore" class="nav-link px-2 text-muted">Explore</a></li>
        <li class="nav-item"><a href="/drinkies/aboutus" class="nav-link px-2 text-muted">About</a></li>
    </ul>
    <p class="text-center text-muted">&copy; 2023 Drinkies, Inc</p>
</footer>
<div id="offcanvasSearch" class="offcanvas offcanvas-top" tabindex="-1">
    <div class="offcanvas-body container">
        <form class="d-flex" action="/drinkies/search">
            <input id="navbar-search" type="search" placeholder="Search..." name="q" autocomplete="off">
            <button class="btn link" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
    </div>
</div>
`;


