! function(e, t) {
    console.log('ass');
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : e.jcf = t(jQuery)
}(this, function(e) {
    "use strict";
    var t = [],
        n = {
            optionsKey: "jcf",
            dataKey: "jcf-instance",
            rtlClass: "jcf-rtl",
            focusClass: "jcf-focus",
            pressedClass: "jcf-pressed",
            disabledClass: "jcf-disabled",
            hiddenClass: "jcf-hidden",
            resetAppearanceClass: "jcf-reset-appearance",
            unselectableClass: "jcf-unselectable"
        },
        o = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
        a = /Windows Phone/.test(navigator.userAgent);
    n.isMobileDevice = !(!o && !a);
    var i = function() {
        var t = e("<style>").appendTo("head"),
            o = t.prop("sheet") || t.prop("styleSheet"),
            a = function(e, t, n) {
                o.insertRule ? o.insertRule(e + "{" + t + "}", n) : o.addRule(e, t, n)
            };
        a("." + n.hiddenClass, "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"), a("." + n.rtlClass + " ." + n.hiddenClass, "right:-9999px !important; left: auto !important"), a("." + n.unselectableClass, "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"), a("." + n.resetAppearanceClass, "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");
        var i = e("html"),
            r = e("body");
        "rtl" !== i.css("direction") && "rtl" !== r.css("direction") || i.addClass(n.rtlClass), i.on("reset", function() {
            setTimeout(function() {
                s.refreshAll()
            }, 0)
        }), n.styleSheetCreated = !0
    };
    ! function() {
        var t, n = navigator.pointerEnabled || navigator.msPointerEnabled,
            o = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            a = {};
        t = n ? {
            pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
            pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
            pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
            pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp"
        } : {
            pointerover: "mouseover",
            pointerdown: "mousedown" + (o ? " touchstart" : ""),
            pointermove: "mousemove" + (o ? " touchmove" : ""),
            pointerup: "mouseup" + (o ? " touchend" : "")
        }, e.each(t, function(t, n) {
            e.each(n.split(" "), function(e, n) {
                a[n] = t
            })
        }), e.each(t, function(t, n) {
            n = n.split(" "), e.event.special["jcf-" + t] = {
                setup: function() {
                    var t = this;
                    e.each(n, function(e, n) {
                        t.addEventListener ? t.addEventListener(n, s, !1) : t["on" + n] = s
                    })
                },
                teardown: function() {
                    var t = this;
                    e.each(n, function(e, n) {
                        t.addEventListener ? t.removeEventListener(n, s, !1) : t["on" + n] = null
                    })
                }
            }
        });
        var i = null,
            r = function(e) {
                var t = Math.abs(e.pageX - i.x),
                    n = Math.abs(e.pageY - i.y);
                if (t <= 25 && n <= 25) return !0
            },
            s = function(t) {
                var n = t || window.event,
                    o = null,
                    s = a[n.type];
                if (t = e.event.fix(n), t.type = "jcf-" + s, n.pointerType) switch (n.pointerType) {
                    case 2:
                        t.pointerType = "touch";
                        break;
                    case 3:
                        t.pointerType = "pen";
                        break;
                    case 4:
                        t.pointerType = "mouse";
                        break;
                    default:
                        t.pointerType = n.pointerType
                } else t.pointerType = n.type.substr(0, 5);
                return t.pageX || t.pageY || (o = n.changedTouches ? n.changedTouches[0] : n, t.pageX = o.pageX, t.pageY = o.pageY), "touchend" === n.type && (i = {
                    x: t.pageX,
                    y: t.pageY
                }), "mouse" === t.pointerType && i && r(t) ? void 0 : (e.event.dispatch || e.event.handle).call(this, t)
            }
    }(),
    function() {
        var t = ("onwheel" in document || document.documentMode >= 9 ? "wheel" : "mousewheel DOMMouseScroll").split(" ");
        e.event.special["jcf-mousewheel"] = {
            setup: function() {
                var o = this;
                e.each(t, function(e, t) {
                    o.addEventListener ? o.addEventListener(t, n, !1) : o["on" + t] = n
                })
            },
            teardown: function() {
                var o = this;
                e.each(t, function(e, t) {
                    o.addEventListener ? o.removeEventListener(t, n, !1) : o["on" + t] = null
                })
            }
        };
        var n = function(t) {
            var n = t || window.event;
            if (t = e.event.fix(n), t.type = "jcf-mousewheel", "detail" in n && (t.deltaY = -n.detail), "wheelDelta" in n && (t.deltaY = -n.wheelDelta), "wheelDeltaY" in n && (t.deltaY = -n.wheelDeltaY), "wheelDeltaX" in n && (t.deltaX = -n.wheelDeltaX), "deltaY" in n && (t.deltaY = n.deltaY), "deltaX" in n && (t.deltaX = n.deltaX), t.delta = t.deltaY || t.deltaX, 1 === n.deltaMode) {
                t.delta *= 16, t.deltaY *= 16, t.deltaX *= 16
            }
            return (e.event.dispatch || e.event.handle).call(this, t)
        }
    }();
    var r = {
            fireNativeEvent: function(t, n) {
                e(t).each(function() {
                    var e, t = this;
                    t.dispatchEvent ? ((e = document.createEvent("HTMLEvents")).initEvent(n, !0, !0), t.dispatchEvent(e)) : document.createEventObject && ((e = document.createEventObject()).target = t, t.fireEvent("on" + n, e))
                })
            },
            bindHandlers: function() {
                var t = this;
                e.each(t, function(n, o) {
                    0 === n.indexOf("on") && e.isFunction(o) && (t[n] = function() {
                        return o.apply(t, arguments)
                    })
                })
            }
        },
        s = {
            version: "1.2.0",
            modules: {},
            getOptions: function() {
                return e.extend({}, n)
            },
            setOptions: function(t, o) {
                arguments.length > 1 ? this.modules[t] && e.extend(this.modules[t].prototype.options, o) : e.extend(n, t)
            },
            addModule: function(o) {
                e.isFunction(o) && (o = o(e, window));
                var a = function(o) {
                        o.element.data(n.dataKey) || o.element.data(n.dataKey, this), t.push(this), this.options = e.extend({}, n, this.options, i(o.element), o), this.bindHandlers(), this.init.apply(this, arguments)
                    },
                    i = function(t) {
                        var o = t.data(n.optionsKey),
                            a = t.attr(n.optionsKey);
                        if (o) return o;
                        if (a) try {
                            return e.parseJSON(a)
                        } catch (e) {}
                    };
                a.prototype = o, e.extend(o, r), o.plugins && e.each(o.plugins, function(t, n) {
                    e.extend(n.prototype, r)
                });
                var s = a.prototype.destroy;
                a.prototype.destroy = function() {
                    this.options.element.removeData(this.options.dataKey);
                    for (var e = t.length - 1; e >= 0; e--)
                        if (t[e] === this) {
                            t.splice(e, 1);
                            break
                        }
                    s && s.apply(this, arguments)
                }, this.modules[o.name] = a
            },
            getInstance: function(t) {
                return e(t).data(n.dataKey)
            },
            replace: function(t, o, a) {
                var r, s = this;
                return n.styleSheetCreated || i(), e(t).each(function() {
                    var t, i = e(this);
                    (r = i.data(n.dataKey)) ? r.refresh(): (o || e.each(s.modules, function(e, t) {
                        if (t.prototype.matchElement.call(t.prototype, i)) return o = e, !1
                    }), o && (t = e.extend({
                        element: i
                    }, a), r = new s.modules[o](t)))
                }), r
            },
            refresh: function(t) {
                e(t).each(function() {
                    var t = e(this).data(n.dataKey);
                    t && t.refresh()
                })
            },
            destroy: function(t) {
                e(t).each(function() {
                    var t = e(this).data(n.dataKey);
                    t && t.destroy()
                })
            },
            replaceAll: function(t) {
                var n = this;
                e.each(this.modules, function(o, a) {
                    e(a.prototype.selector, t).each(function() {
                        this.className.indexOf("jcf-ignore") < 0 && n.replace(this, o)
                    })
                })
            },
            refreshAll: function(o) {
                if (o) e.each(this.modules, function(t, a) {
                    e(a.prototype.selector, o).each(function() {
                        var t = e(this).data(n.dataKey);
                        t && t.refresh()
                    })
                });
                else
                    for (var a = t.length - 1; a >= 0; a--) t[a].refresh()
            },
            destroyAll: function(o) {
                if (o) e.each(this.modules, function(t, a) {
                    e(a.prototype.selector, o).each(function(t, o) {
                        var a = e(o).data(n.dataKey);
                        a && a.destroy()
                    })
                });
                else
                    for (; t.length;) t[0].destroy()
            }
        };
    return window.jcf = s, s
});

jcf.addModule(function(e, t) {
    "use strict";

    function s(t) {
        this.options = e.extend({
            wrapNative: !0,
            wrapNativeOnMobile: !0,
            fakeDropInBody: !0,
            useCustomScroll: !0,
            flipDropToFit: !0,
            maxVisibleItems: 10,
            fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
            fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
            optionClassPrefix: "jcf-option-",
            selectClassPrefix: "jcf-select-",
            dropContentSelector: ".jcf-select-drop-content",
            selectTextSelector: ".jcf-select-text",
            dropActiveClass: "jcf-drop-active",
            flipDropClass: "jcf-drop-flipped"
        }, t), this.init()
    }

    function i(t) {
        this.options = e.extend({
            wrapNative: !0,
            useCustomScroll: !0,
            fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
            selectClassPrefix: "jcf-select-",
            listHolder: ".jcf-list-wrapper"
        }, t), this.init()
    }

    function o(t) {
        this.options = e.extend({
            holder: null,
            maxVisibleItems: 10,
            selectOnClick: !0,
            useHoverClass: !1,
            useCustomScroll: !1,
            handleResize: !0,
            multipleSelectWithoutKey: !1,
            alwaysPreventMouseWheel: !1,
            indexAttribute: "data-index",
            cloneClassPrefix: "jcf-option-",
            containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
            containerSelector: ".jcf-list-content",
            captionClass: "jcf-optgroup-caption",
            disabledClass: "jcf-disabled",
            optionClass: "jcf-option",
            groupClass: "jcf-optgroup",
            hoverClass: "jcf-hover",
            selectedClass: "jcf-selected",
            scrollClass: "jcf-scroll-active"
        }, t), this.init()
    }
    var n = {
        name: "Select",
        selector: "select",
        options: {
            element: null,
            multipleCompactStyle: !1
        },
        plugins: {
            ListBox: i,
            ComboBox: s,
            SelectList: o
        },
        matchElement: function(e) {
            return e.is("select")
        },
        init: function() {
            this.element = e(this.options.element), this.createInstance()
        },
        isListBox: function() {
            return this.element.is("[size]:not([jcf-size]), [multiple]")
        },
        createInstance: function() {
            this.instance && this.instance.destroy(), this.isListBox() && !this.options.multipleCompactStyle ? this.instance = new i(this.options) : this.instance = new s(this.options)
        },
        refresh: function() {
            this.isListBox() && this.instance instanceof s || !this.isListBox() && this.instance instanceof i ? this.createInstance() : this.instance.refresh()
        },
        destroy: function() {
            this.instance.destroy()
        }
    };
    e.extend(s.prototype, {
        init: function() {
            this.initStructure(), this.bindHandlers(), this.attachEvents(), this.refresh()
        },
        initStructure: function() {
            this.win = e(t), this.doc = e(document), this.realElement = e(this.options.element), this.fakeElement = e(this.options.fakeAreaStructure).insertAfter(this.realElement), this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector), this.selectText = e("<span></span>").appendTo(this.selectTextContainer), r(this.fakeElement), this.fakeElement.addClass(l(this.realElement.prop("className"), this.options.selectClassPrefix)), this.realElement.prop("multiple") && this.fakeElement.addClass("jcf-compact-multiple"), this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative && (this.options.wrapNative = !0), this.options.wrapNative ? this.realElement.prependTo(this.fakeElement).css({
                position: "absolute",
                height: "100%",
                width: "100%"
            }).addClass(this.options.resetAppearanceClass) : (this.realElement.addClass(this.options.hiddenClass), this.fakeElement.attr("title", this.realElement.attr("title")), this.fakeDropTarget = this.options.fakeDropInBody ? e("body") : this.fakeElement)
        },
        attachEvents: function() {
            var e = this;
            this.delayedRefresh = function() {
                setTimeout(function() {
                    e.refresh(), e.list && (e.list.refresh(), e.list.scrollToActiveOption())
                }, 1)
            }, this.options.wrapNative ? this.realElement.on({
                focus: this.onFocus,
                change: this.onChange,
                click: this.onChange,
                keydown: this.onChange
            }) : (this.realElement.on({
                focus: this.onFocus,
                change: this.onChange,
                keydown: this.onKeyDown
            }), this.fakeElement.on({
                "jcf-pointerdown": this.onSelectAreaPress
            }))
        },
        onKeyDown: function(e) {
            13 === e.which ? this.toggleDropdown() : this.dropActive && this.delayedRefresh()
        },
        onChange: function() {
            this.refresh()
        },
        onFocus: function() {
            this.pressedFlag && this.focusedFlag || (this.fakeElement.addClass(this.options.focusClass), this.realElement.on("blur", this.onBlur), this.toggleListMode(!0), this.focusedFlag = !0)
        },
        onBlur: function() {
            this.pressedFlag || (this.fakeElement.removeClass(this.options.focusClass), this.realElement.off("blur", this.onBlur), this.toggleListMode(!1), this.focusedFlag = !1)
        },
        onResize: function() {
            this.dropActive && this.hideDropdown()
        },
        onSelectDropPress: function() {
            this.pressedFlag = !0
        },
        onSelectDropRelease: function(e, t) {
            this.pressedFlag = !1, "mouse" === t.pointerType && this.realElement.focus()
        },
        onSelectAreaPress: function(t) {
            !this.options.fakeDropInBody && e(t.target).closest(this.dropdown).length || t.button > 1 || this.realElement.is(":disabled") || (this.selectOpenedByEvent = t.pointerType, this.toggleDropdown(), this.focusedFlag || ("mouse" === t.pointerType ? this.realElement.focus() : this.onFocus(t)), this.pressedFlag = !0, this.fakeElement.addClass(this.options.pressedClass), this.doc.on("jcf-pointerup", this.onSelectAreaRelease))
        },
        onSelectAreaRelease: function(e) {
            this.focusedFlag && "mouse" === e.pointerType && this.realElement.focus(), this.pressedFlag = !1, this.fakeElement.removeClass(this.options.pressedClass), this.doc.off("jcf-pointerup", this.onSelectAreaRelease)
        },
        onOutsideClick: function(t) {
            var s = e(t.target);
            s.closest(this.fakeElement).length || s.closest(this.dropdown).length || this.hideDropdown()
        },
        onSelect: function() {
            this.refresh(), this.realElement.prop("multiple") ? this.repositionDropdown() : this.hideDropdown(), this.fireNativeEvent(this.realElement, "change")
        },
        toggleListMode: function(e) {
            this.options.wrapNative || (e ? this.realElement.attr({
                size: 4,
                "jcf-size": ""
            }) : this.options.wrapNative || this.realElement.removeAttr("size jcf-size"))
        },
        createDropdown: function() {
            this.dropdown && (this.list.destroy(), this.dropdown.remove()), this.dropdown = e(this.options.fakeDropStructure).appendTo(this.fakeDropTarget), this.dropdown.addClass(l(this.realElement.prop("className"), this.options.selectClassPrefix)), r(this.dropdown), this.realElement.prop("multiple") && this.dropdown.addClass("jcf-compact-multiple"), this.options.fakeDropInBody && this.dropdown.css({
                position: "absolute",
                top: -9999
            }), this.list = new o({
                useHoverClass: !0,
                handleResize: !1,
                alwaysPreventMouseWheel: !0,
                maxVisibleItems: this.options.maxVisibleItems,
                useCustomScroll: this.options.useCustomScroll,
                holder: this.dropdown.find(this.options.dropContentSelector),
                multipleSelectWithoutKey: this.realElement.prop("multiple"),
                element: this.realElement
            }), e(this.list).on({
                select: this.onSelect,
                press: this.onSelectDropPress,
                release: this.onSelectDropRelease
            })
        },
        repositionDropdown: function() {
            var e, t, s, i = this.fakeElement.offset(),
                o = this.fakeElement.outerWidth(),
                n = this.fakeElement.outerHeight(),
                l = this.dropdown.css("width", o).outerHeight(),
                r = this.win.scrollTop(),
                h = this.win.height(),
                a = !1;
            i.top + n + l > r + h && i.top - l > r && (a = !0), this.options.fakeDropInBody && (s = "static" !== this.fakeDropTarget.css("position") ? this.fakeDropTarget.offset().top : 0, this.options.flipDropToFit && a ? (t = i.left, e = i.top - l - s) : (t = i.left, e = i.top + n - s), this.dropdown.css({
                width: o,
                left: t,
                top: e
            })), this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && a)
        },
        showDropdown: function() {
            this.realElement.prop("options").length && (this.dropdown || this.createDropdown(), this.dropActive = !0, this.dropdown.appendTo(this.fakeDropTarget), this.fakeElement.addClass(this.options.dropActiveClass), this.refreshSelectedText(), this.repositionDropdown(), this.list.setScrollTop(this.savedScrollTop), this.list.refresh(), this.win.on("resize", this.onResize), this.doc.on("jcf-pointerdown", this.onOutsideClick))
        },
        hideDropdown: function() {
            this.dropdown && (this.savedScrollTop = this.list.getScrollTop(), this.fakeElement.removeClass(this.options.dropActiveClass + " " + this.options.flipDropClass), this.dropdown.removeClass(this.options.flipDropClass).detach(), this.doc.off("jcf-pointerdown", this.onOutsideClick), this.win.off("resize", this.onResize), this.dropActive = !1, "touch" === this.selectOpenedByEvent && this.onBlur())
        },
        toggleDropdown: function() {
            this.dropActive ? this.hideDropdown() : this.showDropdown()
        },
        refreshSelectedText: function() {
            var t, s = this.realElement.prop("selectedIndex"),
                i = this.realElement.prop("options")[s],
                o = i ? i.getAttribute("data-image") : null,
                n = "",
                r = this;
            this.realElement.prop("multiple") ? (e.each(this.realElement.prop("options"), function(e, t) {
                t.selected && (n += (n ? ", " : "") + t.innerHTML)
            }), n || (n = r.realElement.attr("placeholder") || ""), this.selectText.removeAttr("class").html(n)) : i ? this.currentSelectedText === i.innerHTML && this.currentSelectedImage === o || (t = l(i.className, this.options.optionClassPrefix), this.selectText.attr("class", t).html(i.innerHTML), o ? (this.selectImage || (this.selectImage = e("<img>").prependTo(this.selectTextContainer).hide()), this.selectImage.attr("src", o).show()) : this.selectImage && this.selectImage.hide(), this.currentSelectedText = i.innerHTML, this.currentSelectedImage = o) : (this.selectImage && this.selectImage.hide(), this.selectText.removeAttr("class").empty())
        },
        refresh: function() {
            "none" === this.realElement.prop("style").display ? this.fakeElement.hide() : this.fakeElement.show(), this.refreshSelectedText(), this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(":disabled"))
        },
        destroy: function() {
            this.options.wrapNative ? this.realElement.insertBefore(this.fakeElement).css({
                position: "",
                height: "",
                width: ""
            }).removeClass(this.options.resetAppearanceClass) : (this.realElement.removeClass(this.options.hiddenClass), this.realElement.is("[jcf-size]") && this.realElement.removeAttr("size jcf-size")), this.fakeElement.remove(), this.doc.off("jcf-pointerup", this.onSelectAreaRelease), this.realElement.off({
                focus: this.onFocus
            })
        }
    }), e.extend(i.prototype, {
        init: function() {
            this.bindHandlers(), this.initStructure(), this.attachEvents()
        },
        initStructure: function() {
            this.realElement = e(this.options.element), this.fakeElement = e(this.options.fakeStructure).insertAfter(this.realElement), this.listHolder = this.fakeElement.find(this.options.listHolder), r(this.fakeElement), this.fakeElement.addClass(l(this.realElement.prop("className"), this.options.selectClassPrefix)), this.realElement.addClass(this.options.hiddenClass), this.list = new o({
                useCustomScroll: this.options.useCustomScroll,
                holder: this.listHolder,
                selectOnClick: !1,
                element: this.realElement
            })
        },
        attachEvents: function() {
            var t = this;
            this.delayedRefresh = function(e) {
                e && 16 === e.which || (clearTimeout(t.refreshTimer), t.refreshTimer = setTimeout(function() {
                    t.refresh(), t.list.scrollToActiveOption()
                }, 1))
            }, this.realElement.on({
                focus: this.onFocus,
                click: this.delayedRefresh,
                keydown: this.delayedRefresh
            }), e(this.list).on({
                select: this.onSelect,
                press: this.onFakeOptionsPress,
                release: this.onFakeOptionsRelease
            })
        },
        onFakeOptionsPress: function(e, t) {
            this.pressedFlag = !0, "mouse" === t.pointerType && this.realElement.focus()
        },
        onFakeOptionsRelease: function(e, t) {
            this.pressedFlag = !1, "mouse" === t.pointerType && this.realElement.focus()
        },
        onSelect: function() {
            this.fireNativeEvent(this.realElement, "change"), this.fireNativeEvent(this.realElement, "click")
        },
        onFocus: function() {
            this.pressedFlag && this.focusedFlag || (this.fakeElement.addClass(this.options.focusClass), this.realElement.on("blur", this.onBlur), this.focusedFlag = !0)
        },
        onBlur: function() {
            this.pressedFlag || (this.fakeElement.removeClass(this.options.focusClass), this.realElement.off("blur", this.onBlur), this.focusedFlag = !1)
        },
        refresh: function() {
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(":disabled")), this.list.refresh()
        },
        destroy: function() {
            this.list.destroy(), this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass), this.fakeElement.remove()
        }
    }), e.extend(o.prototype, {
        init: function() {
            this.initStructure(), this.refreshSelectedClass(), this.attachEvents()
        },
        initStructure: function() {
            this.element = e(this.options.element), this.indexSelector = "[" + this.options.indexAttribute + "]", this.container = e(this.options.containerStructure).appendTo(this.options.holder), this.listHolder = this.container.find(this.options.containerSelector), this.lastClickedIndex = this.element.prop("selectedIndex"), this.rebuildList()
        },
        attachEvents: function() {
            this.bindHandlers(), this.listHolder.on("jcf-pointerdown", this.indexSelector, this.onItemPress), this.listHolder.on("jcf-pointerdown", this.onPress), this.options.useHoverClass && this.listHolder.on("jcf-pointerover", this.indexSelector, this.onHoverItem)
        },
        onPress: function(t) {
            e(this).trigger("press", t), this.listHolder.on("jcf-pointerup", this.onRelease)
        },
        onRelease: function(t) {
            e(this).trigger("release", t), this.listHolder.off("jcf-pointerup", this.onRelease)
        },
        onHoverItem: function(e) {
            var t = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
            this.fakeOptions.removeClass(this.options.hoverClass).eq(t).addClass(this.options.hoverClass)
        },
        onItemPress: function(e) {
            "touch" === e.pointerType || this.options.selectOnClick ? (this.tmpListOffsetTop = this.list.offset().top, this.listHolder.on("jcf-pointerup", this.indexSelector, this.onItemRelease)) : this.onSelectItem(e)
        },
        onItemRelease: function(e) {
            this.listHolder.off("jcf-pointerup", this.indexSelector, this.onItemRelease), this.tmpListOffsetTop === this.list.offset().top && this.listHolder.on("click", this.indexSelector, {
                savedPointerType: e.pointerType
            }, this.onSelectItem), delete this.tmpListOffsetTop
        },
        onSelectItem: function(t) {
            var s, i = parseFloat(t.currentTarget.getAttribute(this.options.indexAttribute)),
                o = t.data && t.data.savedPointerType || t.pointerType || "mouse";
            this.listHolder.off("click", this.indexSelector, this.onSelectItem), t.button > 1 || this.realOptions[i].disabled || (this.element.prop("multiple") ? t.metaKey || t.ctrlKey || "touch" === o || this.options.multipleSelectWithoutKey ? this.realOptions[i].selected = !this.realOptions[i].selected : t.shiftKey ? (s = [this.lastClickedIndex, i].sort(function(e, t) {
                return e - t
            }), this.realOptions.each(function(e, t) {
                t.selected = e >= s[0] && e <= s[1]
            })) : this.element.prop("selectedIndex", i) : this.element.prop("selectedIndex", i), t.shiftKey || (this.lastClickedIndex = i), this.refreshSelectedClass(), "mouse" === o && this.scrollToActiveOption(), e(this).trigger("select"))
        },
        rebuildList: function() {
            var t = this,
                s = this.element[0];
            this.storedSelectHTML = s.innerHTML, this.optionIndex = 0, this.list = e(this.createOptionsList(s)), this.listHolder.empty().append(this.list), this.realOptions = this.element.find("option"), this.fakeOptions = this.list.find(this.indexSelector), this.fakeListItems = this.list.find("." + this.options.captionClass + "," + this.indexSelector), delete this.optionIndex;
            var i = this.options.maxVisibleItems,
                o = this.element.prop("size");
            o > 1 && !this.element.is("[jcf-size]") && (i = o);
            var n = this.fakeOptions.length > i;
            this.container.toggleClass(this.options.scrollClass, n), n && (this.listHolder.css({
                maxHeight: this.getOverflowHeight(i),
                overflow: "auto"
            }), this.options.useCustomScroll && jcf.modules.Scrollable) ? jcf.replace(this.listHolder, "Scrollable", {
                handleResize: this.options.handleResize,
                alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
            }) : this.options.alwaysPreventMouseWheel && (this.preventWheelHandler = function(e) {
                var s = t.listHolder.scrollTop(),
                    i = t.listHolder.prop("scrollHeight") - t.listHolder.innerHeight();
                (s <= 0 && e.deltaY < 0 || s >= i && e.deltaY > 0) && e.preventDefault()
            }, this.listHolder.on("jcf-mousewheel", this.preventWheelHandler))
        },
        refreshSelectedClass: function() {
            var e, t = this,
                s = this.element.prop("multiple"),
                i = this.element.prop("selectedIndex");
            s ? this.realOptions.each(function(e, s) {
                t.fakeOptions.eq(e).toggleClass(t.options.selectedClass, !!s.selected)
            }) : (this.fakeOptions.removeClass(this.options.selectedClass + " " + this.options.hoverClass), e = this.fakeOptions.eq(i).addClass(this.options.selectedClass), this.options.useHoverClass && e.addClass(this.options.hoverClass))
        },
        scrollToActiveOption: function() {
            var e = this.getActiveOptionOffset();
            "number" == typeof e && this.listHolder.prop("scrollTop", e)
        },
        getSelectedIndexRange: function() {
            var e = -1,
                t = -1;
            return this.realOptions.each(function(s, i) {
                i.selected && (e < 0 && (e = s), t = s)
            }), [e, t]
        },
        getChangedSelectedIndex: function() {
            var e, t = this.element.prop("selectedIndex");
            return this.element.prop("multiple") ? (this.previousRange || (this.previousRange = [t, t]), this.currentRange = this.getSelectedIndexRange(), e = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1], this.previousRange = this.currentRange, e) : t
        },
        getActiveOptionOffset: function() {
            var e = this.listHolder.height(),
                t = this.listHolder.prop("scrollTop"),
                s = this.getChangedSelectedIndex(),
                i = this.fakeOptions.eq(s),
                o = i.offset().top - this.list.offset().top,
                n = i.innerHeight();
            return o + n >= t + e ? o - e + n : o < t ? o : void 0
        },
        getOverflowHeight: function(e) {
            var t = this.fakeListItems.eq(e - 1),
                s = this.list.offset().top;
            return t.offset().top + t.innerHeight() - s
        },
        getScrollTop: function() {
            return this.listHolder.scrollTop()
        },
        setScrollTop: function(e) {
            this.listHolder.scrollTop(e)
        },
        createOption: function(e) {
            var t = document.createElement("span");
            t.className = this.options.optionClass, t.innerHTML = e.innerHTML, t.setAttribute(this.options.indexAttribute, this.optionIndex++);
            var s, i = e.getAttribute("data-image");
            return i && ((s = document.createElement("img")).src = i, t.insertBefore(s, t.childNodes[0])), e.disabled && (t.className += " " + this.options.disabledClass), e.className && (t.className += " " + l(e.className, this.options.cloneClassPrefix)), t
        },
        createOptGroup: function(e) {
            var t, s, i = document.createElement("span"),
                o = e.getAttribute("label");
            return t = document.createElement("span"), t.className = this.options.captionClass, t.innerHTML = o, i.appendChild(t), e.children.length && (s = this.createOptionsList(e), i.appendChild(s)), i.className = this.options.groupClass, i
        },
        createOptionContainer: function() {
            return document.createElement("li")
        },
        createOptionsList: function(t) {
            var s = this,
                i = document.createElement("ul");
            return e.each(t.children, function(e, t) {
                var o, n = s.createOptionContainer(t);
                switch (t.tagName.toLowerCase()) {
                    case "option":
                        o = s.createOption(t);
                        break;
                    case "optgroup":
                        o = s.createOptGroup(t)
                }
                i.appendChild(n).appendChild(o)
            }), i
        },
        refresh: function() {
            this.storedSelectHTML !== this.element.prop("innerHTML") && this.rebuildList();
            var e = jcf.getInstance(this.listHolder);
            e && e.refresh(), this.refreshSelectedClass()
        },
        destroy: function() {
            this.listHolder.off("jcf-mousewheel", this.preventWheelHandler), this.listHolder.off("jcf-pointerdown", this.indexSelector, this.onSelectItem), this.listHolder.off("jcf-pointerover", this.indexSelector, this.onHoverItem), this.listHolder.off("jcf-pointerdown", this.onPress)
        }
    });
    var l = function(e, t) {
            return e ? e.replace(/[\s]*([\S]+)+[\s]*/gi, t + "$1 ") : ""
        },
        r = function() {
            function e(e) {
                e.preventDefault()
            }
            var t = jcf.getOptions().unselectableClass;
            return function(s) {
                s.addClass(t).on("selectstart", e)
            }
        }();
    return n
});

! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : a.jQuery)
}(this, function(a) {
    "use strict";

    function b(a) {
        var b, c, d, e, f, g, h, i = {};
        for (f = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), h = 0, g = f.length; h < g && (c = f[h], c.search(/^(http|https|ftp):\/\//) === -1 && c.search(":") !== -1); h++) b = c.indexOf(":"), d = c.substring(0, b), e = c.substring(b + 1), e || (e = void 0), "string" == typeof e && (e = "true" === e || "false" !== e && e), "string" == typeof e && (e = isNaN(e) ? e : +e), i[d] = e;
        return null == d && null == e ? a : i
    }

    function c(a) {
        a = "" + a;
        var b, c, d, e = a.split(/\s+/),
            f = "50%",
            g = "50%";
        for (d = 0, b = e.length; d < b; d++) c = e[d], "left" === c ? f = "0%" : "right" === c ? f = "100%" : "top" === c ? g = "0%" : "bottom" === c ? g = "100%" : "center" === c ? 0 === d ? f = "50%" : g = "50%" : 0 === d ? f = c : g = c;
        return {
            x: f,
            y: g
        }
    }

    function d(b, c) {
        var d = function() {
            c(this.src)
        };
        a('<img src="' + b + '.gif">').on("load", d), a('<img src="' + b + '.jpg">').on("load", d), a('<img src="' + b + '.jpeg">').on("load", d), a('<img src="' + b + '.png">').on("load", d)
    }

    function e(c, d, e) {
        if (this.$element = a(c), "string" == typeof d && (d = b(d)), e ? "string" == typeof e && (e = b(e)) : e = {}, "string" == typeof d) d = d.replace(/\.\w*$/, "");
        else if ("object" == typeof d)
            for (var f in d) d.hasOwnProperty(f) && (d[f] = d[f].replace(/\.\w*$/, ""));
        this.settings = a.extend({}, g, e), this.path = d;
        try {
            this.init()
        } catch (i) {
            if (i.message !== h) throw i
        }
    }
    var f = "vide",
        g = {
            volume: 1,
            playbackRate: 1,
            muted: !0,
            loop: !0,
            autoplay: !0,
            position: "50% 50%",
            posterType: "detect",
            resizing: !0,
            bgColor: "transparent",
            className: ""
        },
        h = "Not implemented";
    e.prototype.init = function() {
        var b, e, f = this,
            g = f.path,
            i = g,
            j = "",
            k = f.$element,
            l = f.settings,
            m = c(l.position),
            n = l.posterType;
        e = f.$wrapper = a("<div>").addClass(l.className).css({
            position: "absolute",
            "z-index": -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-color": l.bgColor,
            "background-repeat": "no-repeat",
            "background-position": m.x + " " + m.y
        }), "object" == typeof g && (g.poster ? i = g.poster : g.mp4 ? i = g.mp4 : g.webm ? i = g.webm : g.ogv && (i = g.ogv)), "detect" === n ? d(i, function(a) {
            console.log(a);
            e.css("background-image", "url(" + a + ")")
        }) : "none" !== n && e.css("background-image", "url(" + i + "." + n + ")"), "static" === k.css("position") && k.css("position", "relative"), k.prepend(e), "object" == typeof g ? (g.mp4 && (j += '<source src="' + g.mp4 + '.mp4" type="video/mp4">'), g.webm && (j += '<source src="' + g.webm + '.webm" type="video/webm">'), g.ogv && (j += '<source src="' + g.ogv + '.ogv" type="video/ogg">'), b = f.$video = a("<video>" + j + "</video>")) : b = f.$video = a('<video><source src="' + g + '.mp4" type="video/mp4"><source src="' + g + '.webm" type="video/webm"><source src="' + g + '.ogv" type="video/ogg"></video>');
        try {
            b.prop({
                autoplay: l.autoplay,
                loop: l.loop,
                volume: l.volume,
                muted: l.muted,
                defaultMuted: l.muted,
                playbackRate: l.playbackRate,
                defaultPlaybackRate: l.playbackRate
            })
        } catch (o) {
            throw new Error(h)
        }
        b.css({
            margin: "auto",
            position: "absolute",
            "z-index": -1,
            top: m.y,
            left: m.x,
            "-webkit-transform": "translate(-" + m.x + ", -" + m.y + ")",
            "-ms-transform": "translate(-" + m.x + ", -" + m.y + ")",
            "-moz-transform": "translate(-" + m.x + ", -" + m.y + ")",
            transform: "translate(-" + m.x + ", -" + m.y + ")",
            visibility: "hidden",
            opacity: 0
        }).one("canplaythrough.vide", function() {
            f.resize()
        }).one("playing.vide", function() {
            b.css({
                visibility: "visible",
                opacity: 1
            }), e.css("background-image", "none")
        }), k.on("resize.vide", function() {
            l.resizing && f.resize()
        }), e.append(b)
    }, e.prototype.getVideoObject = function() {
        return this.$video[0]
    }, e.prototype.resize = function() {
        if (this.$video) {
            var a = this.$wrapper,
                b = this.$video,
                c = b[0],
                d = c.videoHeight,
                e = c.videoWidth,
                f = a.height(),
                g = a.width();
            g / e > f / d ? b.css({
                width: g + 2,
                height: "auto"
            }) : b.css({
                width: "auto",
                height: f + 2
            })
        }
    }, e.prototype.destroy = function() {
        delete a[f].lookup[this.index], this.$video && this.$video.off(f), this.$element.off(f).removeData(f), this.$wrapper.remove()
    }, a[f] = {
        lookup: []
    }, a.fn[f] = function(b, c) {
        var d;
        return this.each(function() {
            d = a.data(this, f), d && d.destroy(), d = new e(this, b, c), d.index = a[f].lookup.push(d) - 1, a.data(this, f, d)
        }), this
    }, a(document).ready(function() {
        var b = a(window);
        b.on("resize.vide", function() {
            for (var b, c = a[f].lookup.length, d = 0; d < c; d++) b = a[f].lookup[d], b && b.settings.resizing && b.resize()
        }), b.on("unload.vide", function() {
            return !1
        }), a(document).find("[data-vide-bg]").each(function(b, c) {
            var d = a(c),
                e = d.data("vide-options"),
                g = d.data("vide-bg");
            d[f](g, e)
        })
    })
});

(function($) {
    "use strict";
    $.ajaxChimp = {
        responses: {
            "We have sent you a confirmation email": 0,
            "Please enter a value": 1,
            "An email address must contain a single @": 2,
            "The domain portion of the email address is invalid (the portion after the @: )": 3,
            "The username portion of the email address is invalid (the portion before the @: )": 4,
            "This email address looks fake or invalid. Please enter a real email address": 5
        },
        translations: {
            en: null
        },
        init: function(selector, options) {
            $(selector).ajaxChimp(options)
        }
    };
    $.fn.ajaxChimp = function(options) {
        $(this).each(function(i, elem) {
            var form = $(elem);
            var email = form.find("input[type=email]");
            var label = form.find("label[for=" + email.attr("id") + "]");
            var settings = $.extend({
                url: form.attr("action"),
                language: "en"
            }, options);
            var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
            form.attr("novalidate", "true");
            email.attr("name", "EMAIL");
            form.submit(function() {
                var msg;

                function successCallback(resp) {
                    if (resp.result === "success") {
                        msg = "We have sent you a confirmation email";
                        label.removeClass("error").addClass("valid");
                        email.removeClass("error").addClass("valid")
                    } else {
                        email.removeClass("valid").addClass("error");
                        label.removeClass("valid").addClass("error");
                        var index = -1;
                        try {
                            var parts = resp.msg.split(" - ", 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1]
                                } else {
                                    index = -1;
                                    msg = resp.msg
                                }
                            }
                        } catch (e) {
                            index = -1;
                            msg = resp.msg
                        }
                    }
                    if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
                        msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
                    }
                    label.html(msg);
                    label.show(2e3);
                    if (settings.callback) {
                        settings.callback(resp)
                    }
                }
                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function(index, item) {
                    data[item.name] = item.value
                });
                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: "jsonp",
                    error: function(resp, text) {
                        console.log("mailchimp ajax submit error: " + text)
                    }
                });
                var submitMsg = "Submitting...";
                if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) {
                    submitMsg = $.ajaxChimp.translations[settings.language]["submit"]
                }
                label.html(submitMsg).show(2e3);
                return false
            })
        });
        return this
    }
})(jQuery);