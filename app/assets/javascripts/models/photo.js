Photo = Backbone.Model.extend({
    urlRoot: '/api/users/photos',

    readFile: function(file) {
        var reader = new FileReader();
        console.log(file)
        // closure to capture the file information.
        reader.onload = $.proxy(function (e) {
            console.log('reader loaded')
            var file_data = e.target.result;
            var content_type = file_data.replace(/^data:/, '').replace(/;base64.*/, '');
            var image_data = file_data.replace(/^.*base64,/, '');
            this.set({
                original_filename: file.name,
                content_type: content_type,
                image_data: image_data
            });
            this.save();
        }, this);

        reader.readAsDataURL(file);
    }
});
