var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        form: {
            formatVersion: 1,
            color: 'BEBD7F',
            swatch: '/2-large_default/mandoline.jpg',
            type: 'porte',
            sqmPrice: 10,
            parts: [
                {
                    width: 1,
                    height: 2,
                },
                {
                    width: 3,
                    height: 4,
                }
            ]
        }
    },
    methods: {
        showRalPopup: function () {
//            UIkit.toggle('#modal-full').toggle()
        },
        setSwatch: function (swatch) {
            console.log('setSwatch(' + swatch + ')');
            // if(swatch) {
                this.form.swatch = swatch;
            // }
        },
        addPart: function() {
            this.form.parts.push(this.partFactory());
        },
        removePart: function(part) {
            if(this.form.parts.length <= 1) {
                console.log('Can\'t remove part.')
                return;
            }

            this.form.parts.splice(this.form.parts.indexOf(part), 1);
        },
        partFactory: function() {
            return {
                width: 0,
                height: 0
            };
        }
    },
    beforeMount: function() {
        if (localStorage['panoteq-config'] !== undefined) {
            // console.log('Loading from local storage');
            // this.form = JSON.parse(localStorage['panoteq-config']);
        }
    },
    mounted: function() {
        // Intercept click on add to cart button
        $('form#add-to-cart-or-refresh button[type=button]').click((e) => {
            e.preventDefault();

            // Save custom option
            $('.product-customization-item textarea').val(JSON.stringify(this.form));

            // Add to cart
            $('section.product-customization form').ajaxSubmit((data) => {
                console.log('id_customization: ' + data);
                $('form#add-to-cart-or-refresh input[name=id_customization]').val(data);

                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="qty" value="1">');
                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="add" value="1">');
                $('form#add-to-cart-or-refresh').append('<input type="hidden" name="action" value="update">');

                $('form#add-to-cart-or-refresh').submit();
            });
        });
    },
    computed: {
        summary: function () {
            console.log("Get summary");
            var serialized = JSON.stringify(this.form);

            // Save to local storage
            localStorage['panoteq-config'] = serialized;

            return JSON.stringify(serialized);
        },
        totalAmount: function() {
            var sum = 0;
            this.form.parts.forEach((part) => {
                console.log(part);
                sum += part.width * part.height * this.form.sqmPrice
            });

            return sum;
        }
    }
});
