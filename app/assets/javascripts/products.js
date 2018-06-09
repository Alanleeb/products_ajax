function toggleForm() {
    showForm = !showForm;
    $('#product-form').remove();
    $('#product').text('Products');
    $('#products').remove();
    $('#products-list').toggle()
  
    if (showForm) {
      $.ajax({
        url: '/product_form',
        method: 'GET',
        data: { id: editingForm }
      }).done( function(html) {
        $('#toggle').after(html)
      });
    }
  }

$(document).ready( function() {
      $.ajax({
        url: ' http://json-server.devpointlabs.com/api/v1/products/',
        method: 'GET',
        dataType: 'JSON'
      }).done( function(products) {
        var list = $('#products');
        list.empty();
        products.forEach( function(char) {
          var li = '<li data-product-id="' + char.id + '">' + char.name + '</li>'
          list.append(li)
        });
      });
  });
  (document).on('submit', '#product-form form', function(e) {
    e.preventDefault(); //stops from going to server
    var data = $(this).serializeArray();
    var url = '/products';
    var method = 'POST'
    if (editingGame) {
      url = url + '/';
      method = 'PUT'
    }
    $.ajax({
      url: url,
      type: method,
      dataType: 'JSON',
      data: data
    }).done( function(product) {
      toggleForm()
      getGame(product.id)
    }).fail( function(err) {
      alert(err.responseJSON.errors)
    });
  });