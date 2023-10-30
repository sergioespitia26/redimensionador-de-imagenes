document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".btn");
    const fileInput = document.getElementById("fileInput");
    const canvas = document.getElementById("canvas");
    const resizeButton = document.getElementById("resizeButton");
    const downloadLink = document.getElementById("downloadLink");

    let imageLoaded = false;
    let resized = false;

    btn.addEventListener("click", function () {
        // Cuando se hace clic en el botón "Seleccionar una imagen"
        fileInput.click(); // Abre el diálogo de selección de archivos
    });

    fileInput.addEventListener("change", function () {
        // Cuando se selecciona una imagen
        const file = fileInput.files[0];

        if (file) {
            // Mostrar el canvas
            canvas.style.display = "block";

            // Cargar la imagen en el canvas
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    const ctx = canvas.getContext("2d");
                    canvas.width = 950;
                    canvas.height = 950;
                    ctx.drawImage(img, 0, 0, 950, 950);
                    imageLoaded = true;
                };
            };
            reader.readAsDataURL(file);

            // Mostrar el botón de redimensionar
            resizeButton.style.display = "block";

            // Ocultar el botón de descarga
            downloadLink.style.display = "none";
        }
    });

    resizeButton.addEventListener("click", function () {
        // Cuando se hace clic en "Redimensionar a 950x950"
        if (imageLoaded && !resized) {
            // Redimensionar la imagen
            // Aquí debes agregar tu lógica para redimensionar la imagen en el canvas.
            
            // Mostrar el enlace de descarga
            downloadLink.style.display = "block";
            
            resized = true; // Marcamos que la imagen se ha redimensionado
        }
    });

    downloadLink.addEventListener("click", function () {
        // Cuando se hace clic en "Descargar Imagen"
        downloadCanvas();
    });

    function downloadCanvas() {
        // Descargar la imagen desde el canvas
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'resized_image.jpg';
        link.click();
    }
});
