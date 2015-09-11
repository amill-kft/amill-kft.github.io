new AmillApp();

function AmillApp() {
    var _window;
    var _body;
    var _scrollItems;

    _init();
    function _init() {
        $(_onPageLoad);
    }

    function _onPageLoad() {
        _window = $(window);
        _body = $(document.body);
        _scrollItems = $('[add-class-on-scroll]').toArray()
            .map(function(el) {
                var element = $(el);

                return {
                    element: element,
                    classToAdd: element.attr('add-class-on-scroll'),
                    offsetTop: element.offset().top
                };
            });

        _onWindowScroll();
        _window.scroll(_onWindowScroll);
    }

    function _onWindowScroll() {
        var currentScrollPosition = _window.scrollTop();

        if(currentScrollPosition > 250) {
            _body.addClass('scrolled-over');
        }
        else {
            _body.removeClass('scrolled-over');
        }

        if(!_scrollItems.length) {
            return;
        }

        var windowHeight = _window.height();

        var scrollBoundary = currentScrollPosition + windowHeight;

        var scrolledItems = _scrollItems
            .filter(function(item) {
                return item.offsetTop < scrollBoundary;
            });

        scrolledItems.forEach(function(item) {
                item.element.addClass(item.classToAdd);
            });

        _scrollItems = _scrollItems.filter(function(item) {
            return scrolledItems.indexOf(item) === -1;
        });
    }
}