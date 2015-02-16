# ParseRecord

ParseRecord is a nice Angular wrapper for Parse models. It makes data-binding possible again.

## Installation

**(1)** Download manually or install from bower:

```bash
$ bower install parse-record
```

**(2)** Include `parse-record.js` or `parse-record.min.js` in your `index.html` after including Angular itself.

**(3)** Add `ParseRecord` to your main module's list of dependencies

## Example

`ProductService.js`

```js
app.factory('ProductService', function(ParseRecord) {

  return ParseRecord.extend('Product', [
    // fields
    'name',
    'category',
    'image',
    'price',
    'discount'
  ], {
    // instance methods
    priceWithTaxes: function() {
      return this.price * 1.20;
    }
  }, {
    // class methods
    getFromCategory: function(category) {
      return this.query()
        .equalTo('category', category)
        .find();
    },
    getPromotions: function(minimumDiscount) {
      return this.query()
        .greaterThan('discount', minimumDiscount)
        .find();
    }
  });

});
```

`PromotionsCtrl.js`

```js
app.controller('PromotionsCtrl', function(ProductService) {

  ProductService.getPromotions().then(function(products) {
    $scope.products = products;
  });

});
```

`promotions.html`

```html
<ul>
  <li ng-repeat="product in products">
    <h3>{{ product.name }}</h3>
    <img ng-src="{{ product.image._url }}" alt="{{ product.name }}">
    <p>Price: <b>{{ product.price }}</b></p>
  </li>
</ul>
```

## Usage

##### Initialization

```js
var model = ParseRecord.extend(name, fields, methods, queries);
```

- **name**: Parse class name
- **fields**: fields names accessible through data-binding
- **methods**: methods applicable to a class instance 
- **queries**: queries applicable to a collection of classes

When you want to create the User model, you should use `User` as name, not `_User` as Parse uses.

##### Querying

There is a helper method `query()` that will give you a parse query instance.

```js
ProductService.query().equalTo('name', 'iPad').find();
```

For more queries, please checkout Parse's docs [here](https://parse.com/docs/js_guide#queries).

Each query call should end with `find()` which will return a promise.

```js
ProductService.query().find().then(function(products) {
  // "products" will contain the results
});
```

In order to follow best practices, you should define all your queries in a separate service. This way you will not have to repeat yourself every time and you will be able to change the way a query is executed only by changing in one place. Checkout the example above.

There are two other helpers you can use:

```js
ProductService.all().then(...);
ProductService.first().then(...);
```

## To Do

- docs for instantiation and saving
- docs for relations/includes
- live demo site

## Author

#### Andrei Canta

- https://twitter.com/deiucanta
- https://github.com/deiucanta

## LICENSE

ParseRecord is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.