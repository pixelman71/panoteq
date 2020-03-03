var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        form: {
            formatVersion: 1,
            color: 'BEBD7F',
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
                },
            ]
        }
    },
    methods: {
        showRalPopup: function () {
//            UIkit.toggle('#modal-full').toggle();
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
        if(localStorage['panoteq-config'] !== undefined) {
            console.log('Loading from local storage');
            this.form = JSON.parse(localStorage['panoteq-config']);
        }
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
