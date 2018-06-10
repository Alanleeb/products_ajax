var del = '<button id="delete" >' + 'Delete' + '</button>'
var edit = '<button id="edit" >' + 'Edit' + '</button>'
const url = ' http://json-server.devpointlabs.com/api/v1/products/'

$(document).ready( function() {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSON'
      }).done( function(products) {
        var list = $('#products');
        products.forEach( function(char) {
          var li = '<li data-product-id="' + char.id +'">' + 'Name: ' + char.name + '<br />' +  'Description: ' + char.description + '<br />' + 'Price :' + char.price + '<br />' + del + edit + '</li>'
          list.append(li)
        });
      });
      $('#newitem').on('click', function() {
       let name = $('#name').val()
       let price = $('#price').val()
       let description = $('#description').val()
       var item = {product: {name: name, price: price, description: description}}
      $.ajax({
        url: url,
        method: 'POST',
        dataType: 'JSON',
        data: item
      }).done( function(item){
        var list = $('#products');
        var li = '<li data-product-id="' + item.id +'">' + 'Name: ' + item.name + '<br />' +  'Description: ' + item.description + '<br />' + 'Price :' + item.price + '<hr />' + del +  edit + '</li>'
        list.append(li)
        $('#name').val("")
        $('#price').val("")
        $('#description').val("")
      })
    })
    $(document).on('click', '#delete', function(){
      var id = this.parentElement.dataset.productId
      debugger
     $.ajax({
       url: url + id,
       method: 'DELETE'
      }).done( function(msg) {
        var row = $("[data-id='" + id + "'")
        row.parent().remove('li');
        alert(msg.message)
      })
    })

  })

 