var $$ = document.querySelectorAll.bind(document);

document.body.addEventListener('mousedown', showEffect, false);


var Effect = {
    duration: 750,
    hide: function (e, element) {
        var el = this;
        var width = el.clientWidth * 1.4;

        // Get first ripple
        var ripple = null;
        var ripples = el.getElementsByClassName('waves-ripple');
        if (ripples.length > 0) {
            ripple = ripples[ripples.length - 1];
        } else {
            return false;
        }

        setTimeout(function () {
            try {
                el.removeChild(ripple);
            } catch (e) {
                return false;
            }
        }, Effect.duration);
    },
    show: function (e, element) {
        var el = element || this;

        var ripple = document.createElement('div');
        ripple.className = 'waves-ripple';
        el.appendChild(ripple);


        var pos = offset(el);
        var relativeY = (e.pageY - pos.top);
        var relativeX = (e.pageX - pos.left);
        var scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';


        var rippleStyle = {
            'top': relativeY + 'px',
            'left': relativeX + 'px'
        };


        /* effect */
        rippleStyle['-webkit-transform'] = scale;
        rippleStyle['-moz-transform'] = scale;
        rippleStyle['-ms-transform'] = scale;
        rippleStyle['-o-transform'] = scale;
        rippleStyle.transform = scale;
        rippleStyle.opacity = '1';

        rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
        rippleStyle['transition-duration'] = Effect.duration + 'ms';

        rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
        rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

        ripple.setAttribute('style', convertStyle(rippleStyle));
    }
}


function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
        if (obj.hasOwnProperty(a)) {
            style += (a + ':' + obj[a] + ';');
        }
    }

    return style;
}

function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}


function offset(elem) {
    var docElem, win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
    };
}

function showEffect(e) {
    var element = getWavesEffectElement(e);
    Effect.show(e, element);

    element.addEventListener('mouseup', Effect.hide, false);
    element.addEventListener('mouseleave', Effect.hide, false);
    element.addEventListener('dragend', Effect.hide, false);

}

function getWavesEffectElement(e) {
    /* if (TouchHandler.allowEvent(e) === false) {
        return null;
    } */

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
        if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
            element = target;
            break;
        }
        target = target.parentNode;
    }
    return element;
}