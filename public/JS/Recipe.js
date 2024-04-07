// Recipe
document.addEventListener("DOMContentLoaded", function () {
    const recipeitem = document.querySelectorAll('.Recipe-Item');
  
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
  
    recipeitem.forEach(item => {
        observer.observe(item);
    });
  });

  

// COMMENT
var negativeWords = ["fuck", "shit", "damn", "bitch", "asshole", "motherfucker", "cunt", "bastard", "dick", "cock",
"kontol", "babi", "bangsat", "goblok", "anjing", "tolol", "asu", "kampang", "setan", "bego", "ngentot"];

// Fungsi untuk menyimpan komentar ke dalam Local Storage
function saveComments() {
    var comments = document.getElementsByClassName("comment");
    var commentsArray = [];
    for (var i = 0; i < comments.length; i++) {
        commentsArray.push(comments[i].innerText);
    }
    localStorage.setItem("comments", JSON.stringify(commentsArray));
}

// Fungsi untuk memuat komentar dari Local Storage saat halaman dimuat
function loadComments() {
    var commentsArray = JSON.parse(localStorage.getItem("comments"));
    if (commentsArray) {
        var commentList = document.getElementById("comments-list");
        commentList.innerHTML = ""; // Kosongkan daftar komentar sebelum memuat dari Local Storage
        for (var i = 0; i < commentsArray.length; i++) {
            var commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.innerText = commentsArray[i];
            // Tambahkan tombol Hapus untuk setiap komentar
            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.onclick = function() {
                deleteComment(this.parentNode);
            };
            commentDiv.appendChild(deleteButton);
            commentList.appendChild(commentDiv);
        }
    }
}

// Fungsi Untuk Memfilter komen
function filterComment(comment) {
    var words = comment.split(" "); // Pisahkan komentar menjadi array kata-kata
    for (var i = 0; i < words.length; i++) {
        // Periksa setiap kata dalam komentar
        if (negativeWords.includes(words[i])) {
            return false; // Jika ada kata negatif, kembalikan false
        }
    }
    return true; // Jika tidak ada kata negatif, kembalikan true
}

// Fungsi untuk menambahkan komentar
function addComment() {
    var commentInput = document.getElementById("comment-input").value;
    if (commentInput !== "") {
        if (commentInput.length > 200) {
            alert("Your comment exceeds the maximum character limit of 200.");
            return;
        }

        // Filter out comments containing negative words
        if (!filterComment(commentInput)) {
            alert("Your comment contains inappropriate language.");
            return;
        }

        // Add the comment to local storage
        var comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(commentInput);
        localStorage.setItem("comments", JSON.stringify(comments));

        // Re-render the comment list
        renderComments();

        document.getElementById("comment-input").value = "";
    } else {
        alert("Please enter a comment!");
    }
}

// Fungsi untuk menangani inputan ketika tombol "Enter" ditekan
function handleKeyPress(event) {
    if (event.keyCode === 13) { // 13 adalah kode untuk tombol "Enter"
        event.preventDefault(); // Mencegah perilaku default tombol "Enter"
        addComment(); // Panggil fungsi addComment() untuk menambahkan komentar
    }
}

// Fungsi untuk menghapus komentar
function deleteComment(commentIndex) {
    var comments = JSON.parse(localStorage.getItem("comments"));
    comments.splice(commentIndex, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
}

// Fungsi untuk merender daftar komentar
function renderComments() {
    var commentList = document.getElementById("comments-list");
    commentList.innerHTML = ""; // Bersihkan daftar komentar sebelum membangun ulang

    var comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(function(comment, index) {
        var commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.innerText = comment;

        // Tambahkan tombol delete
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function() {
            deleteComment(index);
        };
        commentDiv.appendChild(deleteButton);

        commentList.appendChild(commentDiv);
    });
}

// Panggil renderComments saat halaman dimuat ulang
window.onload = function() {
    renderComments();
    // Tambahkan event listener untuk menangani inputan tombol "Enter"
    document.getElementById("comment-input").addEventListener("keypress", handleKeyPress);
};

// Intro (Carousel)
function carousel() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const itemWidth = carousel.clientWidth;
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
  
    let currentIndex = 0;
  
    function moveCarousel() {
      carouselInner.style.transition = 'transform 0.5s ease'; 
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  
    function moveToNextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      moveCarousel();
    }
  
    function moveToPrevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      moveCarousel();
    }
  
    function handlePrevButtonClick() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      moveCarousel();
    }
  
    function handleNextButtonClick() {
      moveToNextSlide();
    }
  
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
  
    moveCarousel();
}

carousel();
  
  
  

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