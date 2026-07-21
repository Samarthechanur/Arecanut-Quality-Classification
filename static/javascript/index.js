function previewImage() {
    const fileInput = document.getElementById("photo-upload");
    const preview = document.getElementById("photo-preview");
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
      preview.classList.add('with-border');
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
      preview.classList.remove('with-border');
    }
  }


  const form = document.getElementById("myForm");
  const fileInput = document.getElementById("myFile");
  const submitButton = document.getElementById("submitButton");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const imageContainer = document.getElementById("imageContainer");
  const uploadedImage = document.getElementById("uploadedImage");

  form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default form submission behavior
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  
  xhr.onloadstart = () => {
    loadingSpinner.style.display = "block"; // show the loading spinner
    submitButton.disabled = true; // disable the submit button
  };
  
  xhr.onloadend = () => {
    loadingSpinner.style.display = "none"; // hide the loading spinner
    submitButton.disabled = false; // re-enable the submit button
  };
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      uploadedImage.setAttribute("src", xhr.responseText); // set the image src to the uploaded file
      imageContainer.style.display = "block"; // show the image container
    }
  };
  
  xhr.open("POST", "/upload"); // replace with the URL of your upload endpoint
  xhr.send(formData);
});


// function validateForm() {
//   var fileInput = document.getElementById('photo-upload');
//   if (fileInput.files.length == 0) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'No file selected!',
//       footer: '<a href="https://stackoverflow.com/">Why do I have this issue?</a>'
//     })
//     return false;
//   }
//   return true;
// }


function sendEmail(){
        var name = document.getElementById("name").value;
        var subject = document.getElementById("subject").value;
        var body = document.getElementById("body").value;
        var to = document.getElementById("email").value;
        var outlookUrl = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body)+ "&to=" + encodeURIComponent(to);
        window.location.href = outlookUrl;
}

  
  function openContactForm() {
		document.getElementById("contact").classList.add("open");
	}

	function closeContact() {
		document.getElementById("contact").classList.remove("open");
    document.getElementById("name").value="";
    document.getElementById("subject").value="";
    document.getElementById("body").value="";
    document.getElementById("email").value="";
  }

  function openAboutUS() {
		document.getElementById("aboutUs").classList.add("open");
	}

  function closeAbout() {
		document.getElementById("aboutUs").classList.remove("open");
  }
	

  function displayFinalResult() {
    const result = document.getElementById('final-result');
    const img = document.getElementById('final-result-image');
    if (result.textContent.trim() !== '') {
      img.classList.add('with-border');
      img.style.display = 'inline-block'; /* show image */
    } else {
      img.classList.remove('with-border');
      img.style.display = 'none'; /* hide image */
    }
  }
  
  function clearImage() {
    const img = document.getElementById('final-result-image');
    img.src = ''; // reset src attribute to clear image
    img.classList.remove('with-border'); // remove border class
    img.style.display = 'none'; // hide image

    const imgResult = document.getElementById('final-result');
    imgResult.textContent = '';

    const imgFullResult = document.getElementById('full-final-result');
    imgFullResult.textContent = '';
  }

 

  function confirmReset() {
    const finalResultImage = document.getElementById('final-result-image');

    if (document.getElementById("photo-upload").value == '' && finalResultImage.src=='') {
      Swal.fire({
        title: 'No file selected',
        text: "Please select a file to reset the form",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to reset the form?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reset it!'
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("myForm").reset();
          document.getElementById('photo-preview').src = '';
          document.getElementById('photo-preview').classList.remove('with-border');
          finalResultImage.src = '';
          clearImage();
          Swal.fire(
            'Reset!',
            'Your form has been reset.',
            'success'
          )
        }
      })
    }
  }
  
  
  function showLoadingAnimation() {
    document.getElementById("loading-animation").classList.remove("hidden");
  }

  function hideLoadingAnimation() {
    document.getElementById("loading-animation").classList.add("hidden");
  }

  function onSubmit() {
    // Show loading animation here

    if (document.getElementById("photo-upload").value != ''){
      document.getElementById("loading-animation").style.display = "block";
      document.getElementById("loading-animation").classList.remove('hidden');
    }
    // return validateForm();
    else{
      var fileInput = document.getElementById('photo-upload');
      if (fileInput.files.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No file selected!',
            footer: '<a href="https://stackoverflow.com/">Why do I have this issue?</a>'
          })
          return false;
        }
      return true;
    }
  }






