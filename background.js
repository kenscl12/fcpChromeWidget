var BASE_URL = "http://findclickprice.ru?url=";
var BUTTON_POPUP_HOVER_CLASS = "findclickHover_";
var BUTTON_POPUP_CSS = "background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaRJREFUeNrMmG1LAkEQx9fTMM0eQMLoRQ9E9b4XfaX9TPexIqIQJXzRkxSFYOKdp87UnBzSrreduzsDf1bOvfPH/nd25iyJTIRhWIdhB7Qh/EYMGkgpv0sZuCYMTcErXssE14ChJfhFI6AP+4JplGH1As6ACLcpGEfFcP4R6MBgPibhJyjBDQ8a2gbE1a4b3lOj8ZQA70FfJha7igmoCroGHXMETCMCneeFDDztfVzNS9AeV8B0Jc/WnSS6GFHGZmMbtAuaKu7B0rqly+51AiJc+4/raOOVAjKiY6vr02I8Ul4031c57MEPXUPANUlYnYO1FeXQO+DhiuRycswIRQZfUA2fKVZv6AoQO52TpWsJaaZx8MkV4OQf9zxzLnUJtV4sAfFl7dZGw1o0MCnGoJu83XXF0Wrh77yTejZbft1zuopViUxafFuAb6BHrqUO99UD11qMDtyJ3z97WAKitX2u3YxVa4sCWre2KKB1a4sAOrE2C5gYVgUn1i4ApZRjg/kdV9YuWzzIOT8WjiMF7Gve/n1G/AMINk+pyxgxgkOW3lyAAQA0+FdBc0ndPwAAAABJRU5ErkJggg==);";
var BUTTON_POPUP_HOVER_STYLE = "." + BUTTON_POPUP_HOVER_CLASS + " {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlpJREFUeNpiZEACM2fOVANS6gwDD54B8eX09PRfjFCHsQEpXyAWZhg84BcQb2aCctwHmeNAABRobkzA0AM5TJJhcAJeUAgqMAxiwMQwyAELKYobGhpi/gEBserZ2dl/iYqKvpSVlX1jZmZ2X1hY+AdNHfjq1Svpv3///iFFz6NHj+TPnj3LsHnzZlYtLa1zkZGRh0hxKN2iGOix35cvX9bt6OhIOn/+vMSgTYOfPn3iXLBgQeTdu3cFBm0m+fHjB9PixYt9B3UufvHihfjatWsNqJpJcAFDNSbm3jw2DnTxS3f+/Z246vev+8/+Y+T8/0Bw48YNFSDzAs0dKMDLyGitx4RhFkgsyp2ZTT3sx+f3n///R5d/+vSpyoBHMT83I2OCNwsbNjlgkfrn0KFDigOeBn1tmLHGFCiah3xVRxcHgjLLoHbgxsPYq0dGRkYmXl7e7wPqwIppv3/sP4vdgcDGxB9DQ8MXNC9mLtz699ej8OdXbOLYihcYALZy7tKloAY5Alco4QLMzMwsgYGBhwZlLgamPUYjI6MTysrKHwadA0GOU1VVvZWSknKQ6g1WSgEoWkEhR6zj6OJAkKO4uLg+SUhIPAWlOWKileoOBDbhP3h4eOzDJqetrf2cnL4I1RwICqHQ0NCthMqzAalJYLmRVo6j2IFCQkLvSUnwdHUgLGoHZWuGHlFLkQPpEbVkO5BeUUuuA+kWtWQ5kJ5Ri+zAz8QqTkxMXDkQfZIHDJDxYIKA1HqUKg4EjaQD6WODtFN3ixHGmjlzpgKQcmCADF4PBnAWGHhnAQIMAC681xc9GmTnAAAAAElFTkSuQmCC) !important;}";
var BUTTON_POPUP_ID = "findclick_";
var LOCAL_STORAGE_ELEMENT_NAME = 'fcpChromeWidgetOn';
var storage = chrome.storage.local;

function getSearchUrl(url) {
    return BASE_URL + transformToUrlParameter(url);
}

function transformToUrlParameter(str) {
    if (!str) {
        return undefined;
    }

    return str.replace(/['"]+/g, '');
}

function getPopupStyle() {
    var style = "<style type='text/css'>";
    style += BUTTON_POPUP_HOVER_STYLE;
    var css = "position: absolute; z-index: 9999999; height: 40px; width: 40px;";
    css += "background-repeat: no-repeat; font-size: 14px; text-align: center; line-height: 45px; border-radius: 6px; cursor: pointer;";
    css += BUTTON_POPUP_CSS;
    style += "#" + BUTTON_POPUP_ID + " {" + css + "}";
    style += "</style>";
    return style;
}

function getPopupCoordsHorizontal(currentImgX) {
    var left = currentImgX + 15;
    return left + "px";
}

function getPopupCoordsVertical(currentImgY) {
    var top = currentImgY + 15;
    return top + "px";
}

function getPopupHtml() {
    return "<a id='" + BUTTON_POPUP_ID + "' target='_blank'></a>";
}

function imageMouseOverEventAction(src, x, y) {
    var imgPopup = document.getElementById(BUTTON_POPUP_ID);
    if (!imgPopup || imgPopup.style.display === 'block')
        return;

    imgPopup.style.top = getPopupCoordsVertical(y);
    imgPopup.style.left = getPopupCoordsHorizontal(x);
    imgPopup.style.display = 'block';
    imgPopup.href = getSearchUrl(src);
}

function imageMouseOverEvent(src, x, y, width) {
    if (width < 120) {
        return;
    }

    storage.get('fcpChromeWidgetOn', function(result) {
        if (result.fcpChromeWidgetOn && result.fcpChromeWidgetOn == true) {
            imageMouseOverEventAction(src, x, y);
        }
    });
}

function imageMouseOutEvent(img) {
    var imgPopup = document.getElementById(BUTTON_POPUP_ID);

    if (!imgPopup || imgPopup.style.display === 'none')
        return;

    imgPopup.style.display = 'none';
}

function imagePopupMouseOverEvent(imgPopup) {
    imgPopup.currentTarget.className += " " + BUTTON_POPUP_HOVER_CLASS;
}

function imagePopupMouseOutEvent(imgPopup) {
    imgPopup.currentTarget.className = imgPopup.currentTarget.className.replace( /(?:^|\s)findclickHover_(?!\S)/ , '' )
}

function vkFcpWidgetIntegration() {
    document.body.innerHTML = document.body.innerHTML + getPopupStyle() + getPopupHtml();
    var imgPopup = document.getElementById(BUTTON_POPUP_ID);
    
    imgPopup["onmouseover"] = test;
}

function siteFcpWidgetIntegration() {
    var popupBlock = getPopupStyle() + getPopupHtml();
    window.document.body.insertAdjacentHTML('beforeend', popupBlock);


    var imgPopup = document.getElementById(BUTTON_POPUP_ID);
    
    if (imgPopup.addEventListener) {
        imgPopup.addEventListener("mouseover", imagePopupMouseOverEvent, false);
        imgPopup.addEventListener("mouseout", imagePopupMouseOutEvent, false);
    }   
}

function backgroundImageToImageUrl(backgroundImage) {
    if (!backgroundImage) {
        return undefined;
    }

    return backgroundImage.slice(4, -1);
}

siteFcpWidgetIntegration();

window.addEventListener("mouseover", function(event) {
    if (typeof event.target.tagName == undefined) {
        return;
    }

    if (event.target.tagName && event.target.tagName.toLowerCase() === "img" || event.target.id === BUTTON_POPUP_ID) {
        imageMouseOverEvent(event.target.src, event.target.x, event.target.y, event.target.width);
        return;
    }

    if (event.target.tagName && event.target.tagName.toLowerCase() === "a" && event.target.style.backgroundImage && event.target.style.backgroundImage.length > 0) {
        var imageUrl = backgroundImageToImageUrl(event.target.style.backgroundImage);
        var elementPosition = event.target.getBoundingClientRect();
        imageMouseOverEvent(imageUrl, document.body.scrollLeft + elementPosition.left, document.body.scrollTop + elementPosition.top, event.target.width);
        return;
    }

    imageMouseOutEvent(event);
}, false);