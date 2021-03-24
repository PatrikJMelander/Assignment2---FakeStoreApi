$(function () {
  $(`#name-error-message`).hide();
  $(`#address-error-message`).hide();
  $(`#email-error-message`).hide();
  $(`#phone-error-message`).hide();
  $(`#send-error-message`).hide();

  $(`#full-name`).focusout(function () {
    checkName();
  });

  $(`#address`).focusout(function () {
    checkAddress();
  });

  $(`#email`).focusout(function () {
    checkEmail();
  });

  $(`#phone`).focusout(function () {
    checkPhone();
  });

  function checkName() {
    let validationPattern = /^[A-Za-z ]*$/;
    const name = $("#full-name").val();

    if (validationPattern.test(name) && name !== "") {
      $(`#name-error-message`).hide();
      $("#full-name").css("border-bottom", "2px solid #34F458");
      return true;
    } else {
      $(`#name-error-message`).show();
      $("#full-name").css("border-bottom", "2px solid #F90A0A");
      return false;
    }
  }

  function checkAddress() {
    let validationPattern = /^[a-zA-Z0-9_ åäö]*$/;
    const address = $("#address").val();

    if (validationPattern.test(address) && address !== "") {
      $(`#address-error-message`).hide();
      $("#address").css("border-bottom", "2px solid #34F458");
      return true;
    } else {
      $(`#address-error-message`).show();
      $("#address").css("border-bottom", "2px solid #F90A0A");
      return false;
    }
  }

  function checkPhone() {
    let validationPattern = /^\d+$/;
    const phone = $("#phone").val();

    if (validationPattern.test(phone) && phone !== "") {
      $(`#phone-error-message`).hide();
      $("#phone").css("border-bottom", "2px solid #34F458");
      return true;
    } else {
      $(`#phone-error-message`).show();
      $("#phone").css("border-bottom", "2px solid #F90A0A");
      return false;
    }
  }

  function checkEmail() {
    let validationPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const name = $("#email").val();

    if (validationPattern.test(name) && name !== "") {
      $(`#email-error-message`).hide();
      $("#email").css("border-bottom", "2px solid #34F458");
      return true;
    } else {
      $(`#email-error-message`).show();
      $("#email").css("border-bottom", "2px solid #F90A0A");
      return false;
    }
  }

  $(`#send-order`).click(function () {
      console.log("inne i swal funktionen")
    if (checkName() && checkAddress() && checkPhone() && checkEmail()) {
        Swal.fire({
            title: 'Bekräfta order?',
            text: "Varorna packas och skickas till dig inom 5 minuter",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#26a343',
            cancelButtonColor: '#a61930',
            confirmButtonText: 'Bekräfta!',
            cancelButtonText: 'Avbryt!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Plockad!',
                'Dina varor är på väg',
                'success',
                
              )
              
              localStorage.removeItem('cartQuantity');
              localStorage.setItem('cartQuantity', 0);
              localStorage.removeItem('totalPriceOfCart');
              localStorage.removeItem('productsInCart');
              document.querySelector(".navigation-cart span").textContent = 0
              setTimeout(() => { location.reload(); }, 2000);
            }
          })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oj...',
            text: 'Något av fälten verkar vara felaktigt ifyllt!',
          })
    }
    
  });

});

