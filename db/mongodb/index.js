const OwnerPersistence = require('./persitences/owner.db');
const MenuPersistence = require('./persitences/menu.db');
const ClientPersistence = require('./persitences/client.db');
const RestaurantPersistence = require('./persitences/restaurant.db')

module.exports = {
    owner: new OwnerPersistence(),
    menu: new MenuPersistence(),
    client: new ClientPersistence(),
    restaurant: new RestaurantPersistence()
}