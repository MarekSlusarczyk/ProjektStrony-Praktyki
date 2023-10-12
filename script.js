document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buttons button');
    const products = document.querySelectorAll('.products .product');
    const productsContainer = document.querySelector('.products');

    function filtrujSekcje() {
        let filter = this.dataset.filter;
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = 'rgb(206, 57, 57)';
            buttons[i].disabled = true;
            buttons[i].style.cursor = 'not-allowed';
        }
        this.style.backgroundColor = 'rgb(123, 22, 255)';

        for(let i = 0; i < products.length; i++) {
            products[i].style.transition = 'all 0.3s ease-in-out';
            products[i].style.scale = '0.0';
            setTimeout(() => {
                products[i].style.display = 'none';
            }, 250);

            setTimeout(() => {
                if ((products[i].dataset.product == filter) || filter == 'all') {
                    products[i].style.transition = 'all 0.7s ease-in-out';
                    products[i].style.display = 'block';
                    setTimeout(() => {
                        productsContainer.style.justifyContent = 'space-evenly';
                        productsContainer.style.alignItems = 'center';
                        products[i].style.scale = '1.0';
                    }, 50);
                } else {
                    products[i].style.display = 'none';
                    productsContainer.style.justifyContent = 'space-between';
                }
            }, 300)
        }

        setTimeout(() => {
            for(let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
                buttons[i].style.cursor = 'pointer';
            }
            for(let i = 0; i < products.length; i++) {
                products[i].style.transition = 'all 0.1s ease-in-out';
            }
        }, 1000)
    }

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', filtrujSekcje)
    }


    const form = document.querySelector('form');

    form.addEventListener('submit', sendForm)


    const formArray = [
        form.querySelector('input[name="name"]'),
        form.querySelector('input[name="email"]'),
        form.querySelector('input[name="subject"]'),
        form.querySelector('textarea[name="message"]')
    ]

    const infoField = document.querySelector('.fourthSection p');
    let infoFieldDefaultValue = infoField.innerHTML;

    function sendForm(e) {
        e.preventDefault();

        const whichOk = [];

        for(let i = 0; i < formArray.length; i++) {
            if (formArray[i].value == '') {
                formArray[i].style.border = '2px solid red';
                infoField.innerHTML = 'Musisz podać wszystkie dane!'
                podswietlNaCzerwono();
                whichOk.push(false);
            } else {
                formArray[i].style.border = 'none';
                whichOk.push(true);
            }

            if (i == formArray.length-1) {
                for(let j = 0; j < whichOk.length; j++) {
                    if (!whichOk[i]) {
                        return
                    }
                }
            }
        }

        
        console.log('Imię: ' + formArray[0].value + '\nEmail: ' +formArray[1].value+ '\nTemat: ' + formArray[2].value + '\nWiadomość: ' + formArray[3].value + '')
        form.reset();
        infoField.innerHTML = 'Wysłano formularz!'
        podswietlNaCzerwono();
    };

    function podswietlNaCzerwono() {
        infoField.style.color = 'red';
        setTimeout(() => {
            infoField.style.color = 'rgb(151, 151, 151)';
            infoField.innerHTML = infoFieldDefaultValue;
        }, 8000);
    }
});