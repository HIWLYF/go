var settings;
var hotkey_inited = false;
var hotkeys = [];
var isMobile = false;

var prefix = "index_tips_";
var div_id = prefix + getBrowserOS();
$("div#" + div_id).css("display", "inherit");

function successCallBack() {
    window.location.reload();
}

function getBrowserOS() {
    var OsObject = "";
    if (isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
        return "ie";
    }
    if (isOpera = navigator.userAgent.toLowerCase().indexOf("metasr") != -1) {
        return "sougou";
    }
    if (isOpera = navigator.userAgent.toLowerCase().indexOf("lbbrowser") != -1) {
        return "liebao";
    }
    if (isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        return "firefox";
    }
    if (isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") != -1) {
        return "chrome";
    }
    if (isSafari = navigator.userAgent.toLowerCase().indexOf("safari") != -1) {
        return "safari";
    }
    if (isOpera = navigator.userAgent.toLowerCase().indexOf("opera") != -1) {
        return "opera";
    }
}

function checkBrowser() {
    if (/Android|webOS|iPhone|iPod|BlackBerry|SymbianOS/i.test(navigator.userAgent)) {
        isMobile = true;
    }
}

function initPage() {
    var favicon;

    // icon
    if (settings["page_icon"] != "") {
        favicon = document.querySelector('link[rel="icon"]');
        // If a <link rel="icon"> element already exists,
        // change its href to the given link.
        if (favicon !== null) {
            favicon.href = settings["page_icon"];
            // Otherwise, create a new element and append it to <head>.
        } else {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.href = settings["page_icon"];
            document.head.appendChild(favicon);
        }
    }

    //logo
    if (settings["page_logo"] != "") {
        $("#navbar-header").append("<img class=\"logo_pic\" src=" + settings["page_logo"] + " alt=\"logo\"></img> ");
    }
    // title
    if (settings["page_title"] != "") {
        $(document).attr("title", settings["page_title"])
        $("#navbar-header").append(settings["page_title"]);
    }
    //desc
    if (settings["page_desc"] != "") {
        $("#desc").append(settings["page_desc"]);
    }
    // background image
    if (settings["page_background"] != "") {
        $("body").css("background-image", "url(" + settings["page_background"] + ")");
    }
    // resize window
    $(window).resize(function() {
        var top_in_digits = ($(window).height() - $("div.content").outerHeight()) / 4;
        top_in_digits = (top_in_digits > 0) ? top_in_digits : 0;
        $("div.content").css({
            position: "relative",
            top: top_in_digits,
            margin: "0 auto",
            float: "none",
            display: "inherit"
        });
    });
    $(window).resize();
}

function initEvent() {
    var temp_building;
    var temp_category_name;
    var modal, evt;
    $("a.website").attr("target", "_blank");
    $("a.website").hover(
        function() {
            $(this).addClass("hover");
        },
        function() {
            $(this).removeClass("hover");
        }
    );
    $("a.website").click(function() {
        $(this).removeClass("hover");
    });

    if (isMobile) {
        return;
    }
    $("div.block-name").click(function() {
        temp_building = $(this).parents("div.building");
        temp_category_name = $(this).find("a.block-name").text();
        $('#categoryConfirmModal').modal('show');
    });
    $('#categoryConfirmModal').on('show.bs.modal', function(event) {
        modal = $(this);
        modal.find('#varText').text('打开' + temp_category_name + '下所有站点？');
    })
    $("#categoryConfirmButton").click(function() {
        temp_building.find("a.website").each(function() {
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                true, false, false, true, 0, null);
            $(this).get(0).dispatchEvent(evt);
        });
        $('#categoryConfirmModal').modal('hide');
    });
    $("#hotkey").click(
        initHotkeyInfo()
    )
    $(document).bind("keydown", function(event) {
        //event.preventDefault();
        console.log("Press " + event.keyCode);
        // F5
        if (event.keyCode == 116) {
            window.location.reload();
        }
        var k = event.which || event.keyCode;
        for (var i = 32; i < 91; i++) {
            if (i == k) {
                var obj = $("a.hotkey" + k);
                if (obj.attr("href") != undefined) {
                    obj.addClass("hover");
                    setTimeout(function() {
                        window.open(obj.attr("href"));
                        obj.removeClass("hover");
                    }, 500);
                }
            }
        }
        return false;
    });
}

function initHotkeyInfo() {
    var tr, tmp, num = 0;
    var td_html = "<td class=\"hotkey\"><span>KK</span></td><td class=\"hotkey-desc\"><span>DD</span></td>";
    // console.log(hotkeys.length)
    if (hotkey_inited) {
        return;
    }
    for (i in hotkeys) {
        if (num == 0) {
            tr = $("<tr></tr>")
            tmp = td_html.replace("KK", hotkeys[i]["key"])
            tmp = tmp.replace("DD", hotkeys[i]["title"])
            tr.append(tmp)
            num = 1;
        } else {
            tr.append("<td class=\"hotkey-placeholder\"></td>")
            tmp = td_html.replace("KK", hotkeys[i]["key"])
            tmp = tmp.replace("DD", hotkeys[i]["title"])
            tr.append(tmp)
            $("#hotkey-table").append(tr)
            num = 0;
        }
    }
    if (num == 1) {
        $("#hotkey-table").append(tr)
    }
    hotkey_inited = true;
}

function createItem(item) {
    var website = $("<div></div>")
    var website_a = $("<a></a>")
    var website_class;
    var cl = "website"


    if (!isMobile) {
        website_class = "col-sm-4 col-lg-4 website"
    } else {
        website_class = "col-xs-4 col-sm-4 website"
    }
    website.attr("class", website_class);


    if (item.hasOwnProperty("hotkey")) {
        for (i in item["hotkey"]) {
            cl += " hotkey" + (item["hotkey"][i].charCodeAt() - 32)
            hotkeys.push({ "title": item["title"], "key": item["hotkey"][i].toUpperCase() })
        }
    }
    website_a.attr({
        "class": cl,
        "href": item["url"]
    })
    website_a.append("<span>TT</span>".replace("TT", item["title"]))
    website.append(website_a)
    return website
}

function addBlock(title, items, index) {
    var block = $("<div></div>");
    var building = $("<div></div>");
    var block_header = $("<div></div>");

    var block_class, building_class;
    var header_html;

    if (!isMobile) {
        block_class = "col-sm-4 col-lg-4 block"
        building_class = "col-sm-12 col-lg-12 building"
        header_html = "<div class=\"col-sm-12 col-lg-12 block-desc\"><div class=\"col-sm-4 col-lg-4 block-name\"><a class=\"block-name\" href=\"#\">TT</a></div><div class=\"col-sm-4 col-lg-4 placeholder\"></div><div class=\"col-sm-4 col-lg-4 placeholder\"></div></div>";
    } else {
        block_class = "col-xs-12 col-sm-12 block"
        building_class = "col-xs-12 col-sm-12 building"
        header_html = "<div class = \"row block-header\"><div class=\"col-xs-12 col-sm-12 block-desc\"><div class=\"col-xs-4 col-sm-4 block-name\"><span class=\"block-name\" href=\"#\">TT</a></div><div class=\"col-xs-4 col-sm-4 placeholder\"></div><div class=\"col-xs-4 col-sm-4 placeholder\"></div></div></div>";
    }

    /*
        block
            building
                header
                item 1
                item 2
    
        */
    block.attr("class", block_class);
    building.attr({ "class": building_class, "id": "building_" + index });
    block_header.attr("class", "row block-header");

    block_header.append(header_html.replace("TT", title))
    building.append(block_header)
    for (i in items) {
        if (items[i]["display"]) {
            building.append(createItem(items[i]))
        }
    }

    block.append(building)
    $("#container").append(block)
}

function initContainer() {
    var blocks;
    checkBrowser()
    var tmp = $.getJSON("/settings.json", function() {
            if (tmp.status == 200) {
                console.log("Load Json OK");
                settings = tmp.responseJSON;
                blocks = settings["blocks"]
                for (i in blocks) {
                    if (blocks[i]["display"]) {
                        addBlock(blocks[i]["block_title"], blocks[i]["items"], i)
                    }
                }
                initPage()
                    // initHotkeyInfo()
                initEvent()
            } else {
                $("body").html("Load Json Failed")
            }
        })
        .error(function() {
            $("body").html("Load Json Failed")
        });
}

$(document).ready(initContainer())