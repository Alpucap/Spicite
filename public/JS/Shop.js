
//SHOP
$(document).ready(function(){
    var originalOrder = $(".product").toArray();
    
    var bestProductIndex = originalOrder.findIndex(function(product) {
        return $(product).find(".bannerbest").length > 0;
    });
    if (bestProductIndex !== -1) {
        var bestProduct = originalOrder.splice(bestProductIndex, 1);
        originalOrder.unshift(bestProduct[0]);
    }

    function sortAlphabetically() {
        var sortedProducts = sortProducts(function(a, b) {
            var textA = $(a).find("h3").text().toUpperCase();
            var textB = $(b).find("h3").text().toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        $(".shop-card").empty().append(sortedProducts);
    }

    function sortByPrice() {
        var sortedProducts = sortProducts(function(a, b) {
            var priceA = getPrice(a);
            var priceB = getPrice(b);
            return priceA - priceB;
        });
        $(".shop-card").empty().append(sortedProducts);
    }

    function sortByOngkir() {
        var sortedProducts = sortProducts(function(a, b) {
            var hasOngkirA = $(a).find(".banner").length > 0;
            var hasOngkirB = $(b).find(".banner").length > 0;
            return hasOngkirA === hasOngkirB ? 0 : hasOngkirA ? -1 : 1;
        });
        $(".shop-card").empty().append(sortedProducts);
    }

    function sortOriginal() {
        $(".shop-card").empty().append(originalOrder);
    }

    $("#sort-alpha").on("click", function() {
        sortAlphabetically();
    });

    $("#sort-price").on("click", function() {
        sortByPrice();
    });

    $("#sort-ongkir").on("click", function() {
        sortByOngkir();
    });

    $("#sort-original").on("click", function() {
        sortOriginal();
    });

    $("#search-bar").on("keyup", function() {
        var searchText = $(this).val().toUpperCase();
        var filteredProducts = originalOrder.filter(function(product) {
            var productName = $(product).find("h3").text().toUpperCase();
            return productName.includes(searchText);
        });
        $(".shop-card").empty().append(filteredProducts);
    });

    function getPrice(product) {
        var priceText = $(product).find("p").text().replace(/[^\d.]/g, '');
        return parseFloat(priceText);
    }

    function sortProducts(compareFunction) {
        var bestProduct = $(".product").find(".bannerbest").parent();
        var otherProducts = $(".product").not(bestProduct);
        var sortedProducts = otherProducts.toArray().sort(compareFunction);
        return [bestProduct].concat(sortedProducts);
    }
});

// FOOTER
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelectorAll('footer');
  
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
  
    footer.forEach(item => {
        observer.observe(item);
    });
});