var del = '<button id=delete-item> Delete</button>'
var url = ' http://json-server.devpointlabs.com/api/v1/products/'

$(document).ready( function() {
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSON'
      }).done( function(products) {
        var list = $('#products');
        products.forEach( function(char) {
          var li = '<li data-product-id="' + char.id + '">' + char.name + '</li>'
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
        var li = '<li data-product-id="' + item.id + '">' + item.name + ' </li>'
        list.append(li)
        $('#name').val("")
        $('#price').val("")
        $('#description').val("")
      })
    })
    $(del).on('click', '#delete-item', function(){
      var id = $(this).siblings('products').dataset().id 
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

 