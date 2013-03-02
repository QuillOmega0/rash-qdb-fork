
function transformTag(elem, newtag)
{
    if (!elem) return;
    var children = elem.childNodes;
    var parent = elem.parentNode;
    var newNode = document.createElement(newtag);
    for (prop in elem) {
	if (prop != 'id') {
	    newNode[prop] = elem[prop];
	}
    }
    parent.replaceChild(newNode,elem);
}


function ajax_vote_handler(id, adj)
{
    if (req.readyState == 4) { // Complete
	if (req.status == 200) { // OK response
	    var e = document.getElementById('quote_rating_'+id);
	    if (e) {
		e.innerHTML = parseInt(e.innerHTML) + adj;
	    }
	    e = document.getElementById('quote_minus_'+id);
	    if (e) {
		transformTag(e, 'span');
		e.href = null;
	    }
	    e = document.getElementById('quote_plus_'+id);
	    if (e) {
		transformTag(e, 'span');
		e.href = null;
	    }
	} else {
	    alert("Error: " + req.statusText);
	}
    }
}

function ajax_vote(id, plusminus)
{
    var url = "index.php?ajaxvote&"+id+"&"+((plusminus > 0) ? "plus" : "minus");

    if (window.XMLHttpRequest) { // Non-IE browsers
	req = new XMLHttpRequest();
	req.onreadystatechange = function () { ajax_vote_handler(id, plusminus); };
	try {
	    req.open("GET", url, true);
	} catch (e) {
	    alert(e);
	}
	req.send(null);
    } else if (window.ActiveXObject) { // IE
	req = new ActiveXObject("Microsoft.XMLHTTP");
	if (req) {
	    req.onreadystatechange = function () { ajax_vote_handler(id, plusminus); };
	    req.open("GET", url, true);
	    req.send();
	}
    }
}
