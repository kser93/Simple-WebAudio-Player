define(
    [
        'backbone',
        'id3',
        'components/EventDispatcher'
    ],
    function(
        Backbone,
        ID3,
        EventDispatcher
    ) {
        var $el = $('[class*=visualization][class*=screen]'),
            ctx = $el[0].getContext('2d');

        var ScreenControl = _.extend({}, Backbone.Events);

        var displayMeta = function(meta) {
            var tags = '';
            if (meta.artist) {
                tags += meta.artist;
                tags += ' - ';
            }
            if (meta.album) {
                tags += meta.album;
                tags += ' - ';
            }
            if (meta.title) {
                tags += meta.title;
            }
            $('[class*=visualization][class*=tags]').text(tags);
            if (meta.cover) {
                displayCover(meta.cover);
            }
        };

        var displayCover = function(cover) {
            ctx.drawImage(cover, 230, 0, 500, 500);
        };

        var arrayToImage = function(array) {
            var base64String = "";
            if (!array) {
                return null;
            }
            for (var i = 0; i < array.data.length; i++) {
                base64String += String.fromCharCode(array.data[i]);
            }
            var dataUrl = "data:" + array.format + ";base64," + window.btoa(base64String);
            var img = new Image;
            img.src = dataUrl;
            return img;
        };

        $('html').on('dragover dragenter drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $el
            .on('dragenter', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $el.addClass('hover');
            })
            .on('dragleave dragend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $el.removeClass('hover');
            })
            .on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $el.removeClass('hover');

                var file = e.originalEvent.dataTransfer.files[0],
                    src = window.URL.createObjectURL(file);

                ID3.loadTags(src, function() {
                    var meta = ID3.getAllTags(src);
                    meta.cover = arrayToImage(meta.picture);
                    console.log(meta);
                    displayMeta(meta);

                }, {
                    dataReader: FileAPIReader(file),
                    tags: ['title', 'artist', 'album', 'picture']
                });

                $('title').text(file.name);
                EventDispatcher.trigger('playFile', src);
            });
        return ScreenControl;
    }
);