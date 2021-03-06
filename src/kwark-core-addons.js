var addons = {
    serialize: {
        form: function (form)
        {
            var field, s = [];
            if (typeof form == 'object' && form.nodeName == "FORM")
            {
                var len = form.elements.length;
                for (var i = 0; i < len; i++)
                {
                    field = form.elements[i];
                    if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button')
                    {
                        if (field.type == 'select-multiple')
                        {
                            for (var j = form.elements[i].options.length - 1; j >= 0; j--)
                            {
                                if (field.options[j].selected)
                                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                            }
                        } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked)
                        {
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                        }
                    }
                }
            }
            return s.join('&').replace(/%20/g, '+');
        },
        object: function (obj)
        {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p))
                {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
    },
    xmlToJson: function (xml)
    {
        var obj = {};
        if (xml.nodeType == 1)
        {
            if (xml.attributes.length > 0)
            {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++)
                {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3)
        {
            obj = xml.nodeValue;
        }

        if (xml.hasChildNodes())
        {
            for (var i = 0; i < xml.childNodes.length; i++)
            {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) == "undefined")
                {
                    obj[nodeName] = xmlToJson(item);
                } else
                {
                    if (typeof(obj[nodeName].push) == "undefined")
                    {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    },
    loadScript: function (source, callback)
    {
        var script = document.createElement('script');
        var prior = document.getElementsByTagName('script')[0];
        script.async = 1;
        prior.parentNode.insertBefore(script, prior);

        script.onload = script.onreadystatechange = function (_, isAbort)
        {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState))
            {
                script.onload = script.onreadystatechange = null;
                script = undefined;

                if (!isAbort)
                {
                    if (callback) callback();
                }
            }
        };

        script.src = source;
    }

};

module.exports = addons;
