// DESIGN_PATTERNS.JS
// examples pulled from http://www.dofactory.com/javascript/design-patterns


//--------------------------------------------------------------------------//
// CREATIONAL
//--------------------------------------------------------------------------//


	// ABSTRACT FACTORY
	//-----------------------------------------------------------------//
	function Employee(name) {
	    this.name = name;
	 
	    this.say = function () {
	        log.add("I am employee " + name);
	    };
	}
	 
	function EmployeeFactory() {
	 
	    this.create = function(name) {
	        return new Employee(name);
	    };
	}
	 
	function Vendor(name) {
	    this.name = name;
	 
	    this.say = function () {
	        log.add("I am vendor " + name);
	    };
	}
	 
	function VendorFactory() {
	 
	    this.create = function(name) {
	        return new Vendor(name);
	    };
	}
	 
	// log helper
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var persons = [];
	    var employeeFactory = new EmployeeFactory();
	    var vendorFactory = new VendorFactory();
	 
	    persons.push(employeeFactory.create("Joan DiSilva"));
	    persons.push(employeeFactory.create("Tim O'Neill"));
	    persons.push(vendorFactory.create("Gerald Watson"));
	    persons.push(vendorFactory.create("Nicole McNight"));
	 
	    for (var i = 0, len = persons.length; i < len; i++) {
	        persons[i].say();
	    }
	 
	    log.show();
	}




	// BUILDER
	//-----------------------------------------------------------------//
	function Shop() {
	    this.construct = function(builder) {
	        builder.step1();
	        builder.step2();
	        return builder.get();
	    }
	}
	 
	function CarBuilder() {
	    this.car = null;
	 
	    this.step1 = function() {
	        this.car = new Car();
	    };
	 
	    this.step2 = function() {
	        this.car.addParts();
	    };
	 
	    this.get = function() {
	        return this.car;
	    };
	}
	 
	function TruckBuilder() {
	    this.truck = null;
	 
	    this.step1 = function() {
	        this.truck = new Truck();
	    };
	 
	    this.step2 = function() {
	        this.truck.addParts();
	    };
	 
	    this.get = function() {
	        return this.truck;
	    };
	}
	 
	function Car() {
	    this.doors = 0;
	 
	    this.addParts = function() {
	        this.doors = 4;
	    };
	 
	    this.say = function() {
	        log.add("I am a " + this.doors + "-door car");
	    };
	}
	 
	function Truck() {
	    this.doors = 0;
	 
	    this.addParts = function() {
	        this.doors = 2;
	    };
	 
	    this.say = function() {
	        log.add("I am a " + this.doors + "-door truck");
	    };
	}
	 
	// log helper
	var log = (function () {
	    var log = "";
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var shop = new Shop();
	    var carBuilder = new CarBuilder();
	    var truckBuilder = new TruckBuilder();
	    var car = shop.construct(carBuilder);
	    var truck = shop.construct(truckBuilder);
	 
	    car.say();
	    truck.say();
	 
	    log.show();
	}



	// FACTORY METHOD
	//-----------------------------------------------------------------//
	function Factory() {
	    this.createEmployee = function (type) {
	        var employee;
	 
	        if (type === "fulltime") {
	            employee = new FullTime();
	        } else if (type === "parttime") {
	            employee = new PartTime();
	        } else if (type === "temporary") {
	            employee = new Temporary();
	        } else if (type === "contractor") {
	            employee = new Contractor();
	        }
	 
	        employee.type = type;
	 
	        employee.say = function () {
	            log.add(this.type + ": rate " + this.hourly + "/hour");
	        }
	 
	        return employee;
	    }
	}
	 
	var FullTime = function () {
	    this.hourly = "$12";
	};
	 
	var PartTime = function () {
	    this.hourly = "$11";
	};
	 
	var Temporary = function () {
	    this.hourly = "$10";
	};
	 
	var Contractor = function () {
	    this.hourly = "$15";
	};
	 
	// log helper
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var employees = [];
	    var factory = new Factory();
	 
	    employees.push(factory.createEmployee("fulltime"));
	    employees.push(factory.createEmployee("parttime"));
	    employees.push(factory.createEmployee("temporary"));
	    employees.push(factory.createEmployee("contractor"));
	    
	    for (var i = 0, len = employees.length; i < len; i++) {
	        employees[i].say();
	    }
	 
	    log.show();
	}



	// PROTOTYPE
	//-----------------------------------------------------------------//
	function CustomerPrototype(proto) {
	    this.proto = proto;
	 
	    this.clone = function () {
	        var customer = new Customer();
	 
	        customer.first = proto.first;
	        customer.last = proto.last;
	        customer.status = proto.status;
	 
	        return customer;
	    };
	}
	 
	function Customer(first, last, status) {
	 
	    this.first = first;
	    this.last = last;
	    this.status = status;
	 
	    this.say = function () {
	        console.log("name: " + this.first + " " + this.last +
	              ", status: " + this.status);
	    };
	}
	 
	function run() {
	 
	    var proto = new Customer("n/a", "n/a", "pending");
	    var prototype = new CustomerPrototype(proto);
	 
	    var customer = prototype.clone();
	    customer.say();
	}



	// SINGLETON
	//-----------------------------------------------------------------//
	var Singleton = (function () {
	    var instance;
	 
	    function createInstance() {
	        var object = new Object("I am the instance");
	        return object;
	    }
	 
	    return {
	        getInstance: function () {
	            if (!instance) {
	                instance = createInstance();
	            }
	            return instance;
	        }
	    };
	})();
	 
	function run() {
	 
	    var instance1 = Singleton.getInstance();
	    var instance2 = Singleton.getInstance();
	 
	    console.log("Same instance? " + (instance1 === instance2));  
	}


//--------------------------------------------------------------------------//
// STRUCTURAL
//--------------------------------------------------------------------------//



	// ADAPTER
	//-----------------------------------------------------------------//
	// old interface
	 
	function Shipping() {
	    this.request = function(zipStart, zipEnd, weight) {
	        // ...
	        return "$49.75";
	    }
	}
	 
	// new interface
	 
	function AdvancedShipping() {
	    this.login = function(credentials) { /* ... */ };
	    this.setStart = function(start) { /* ... */ };
	    this.setDestination = function(destination) { /* ... */ };
	    this.calculate = function(weight) { return "$39.50"; };
	}
	 
	// adapter interface
	 
	function ShippingAdapter(credentials) {
	    var shipping = new AdvancedShipping();
	 
	    shipping.login(credentials);
	 
	    return {
	        request: function(zipStart, zipEnd, weight) {
	            shipping.setStart(zipStart);
	            shipping.setDestination(zipEnd);
	            return shipping.calculate(weight);
	        }
	    };
	}
	 
	// log helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var shipping = new Shipping();
	    var credentials = {token: "30a8-6ee1"};
	    var adapter = new ShippingAdapter(credentials);
	 
	    // original shipping object and interface
	 
	    var cost = shipping.request("78701", "10010", "2 lbs");
	    log.add("Old cost: " + cost);
	 
	    // new shipping object with adapted interface
	 
	    cost = adapter.request("78701", "10010", "2 lbs");
	 
	    log.add("New cost: " + cost);
	    log.show();
	}



	// BRIDGE
	//-----------------------------------------------------------------//
	// input devices
	 
	var Gestures = function (output) {
	    this.output = output;
	 
	    this.tap = function () { this.output.click(); }
	    this.swipe = function () { this.output.move(); }
	    this.pan = function () { this.output.drag(); }
	    this.pinch = function () { this.output.zoom(); }
	};
	 
	var Mouse = function (output) {
	    this.output = output;
	 
	    this.click = function () { this.output.click(); }
	    this.move = function () { this.output.move(); }
	    this.down = function () { this.output.drag(); }
	    this.wheel = function () { this.output.zoom(); }
	};
	 
	// output devices
	 
	var Screen = function () {
	    this.click = function () { log.add("Screen select"); }
	    this.move = function () { log.add("Screen move"); }
	    this.drag = function () { log.add("Screen drag"); }
	    this.zoom = function () { log.add("Screen zoom in"); }
	};
	 
	var Audio = function () {
	    this.click = function () { log.add("Sound oink"); }
	    this.move = function () { log.add("Sound waves"); }
	    this.drag = function () { log.add("Sound screetch"); }
	    this.zoom = function () { log.add("Sound volume up"); }
	};
	 
	// logging helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	 
	    var screen = new Screen();
	    var audio = new Audio();
	 
	    var hand = new Gestures(screen);
	    var mouse = new Mouse(audio);
	 
	    hand.tap();
	    hand.swipe();
	    hand.pinch();
	 
	    mouse.click();
	    mouse.move();
	    mouse.wheel();
	 
	    log.show();
	}



	// COMPOSITE
	//-----------------------------------------------------------------//
	var Node = function (name) {
	    this.children = [];
	    this.name = name;
	}
	 
	Node.prototype = {
	    add: function (child) {
	        this.children.push(child);
	    },
	 
	    remove: function (child) {
	        var length = this.children.length;
	        for (var i = 0; i < length; i++) {
	            if (this.children[i] === child) {
	                this.children.splice(i, 1);
	                return;
	            }
	        }
	    },
	 
	    getChild: function (i) {
	        return this.children[i];
	    },
	 
	    hasChildren: function () {
	        return this.children.length > 0;
	    }
	}
	 
	// recursively traverse a (sub)tree
	 
	function traverse(indent, node) {
	    log.add(Array(indent++).join("--") + node.name);
	 
	    for (var i = 0, len = node.children.length; i < len; i++) {
	        traverse(indent, node.getChild(i));
	    }
	}
	 
	// logging helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var tree = new Node("root");
	    var left = new Node("left")
	    var right = new Node("right");
	    var leftleft = new Node("leftleft");
	    var leftright = new Node("leftright");
	    var rightleft = new Node("rightleft");
	    var rightright = new Node("rightright");
	 
	    tree.add(left);
	    tree.add(right);
	    tree.remove(right);  // note: remove
	    tree.add(right);
	 
	    left.add(leftleft);
	    left.add(leftright);
	 
	    right.add(rightleft);
	    right.add(rightright);
	 
	    traverse(1, tree);
	 
	    log.show();
	}



	// DECORATOR
	//-----------------------------------------------------------------//
	var User = function(name) {
	    this.name = name;
	 
	    this.say = function() {
	        log.add("User: " + this.name);
	    };
	}
	 
	var DecoratedUser = function(user, street, city) {
	    this.user = user;
	    this.name = user.name;  // ensures interface stays the same
	    this.street = street;
	    this.city = city;
	 
	    this.say = function() {
	        log.add("Decorated User: " + this.name + ", " +
	                   this.street + ", " + this.city);
	    };
	}
	 
	// logging helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	 
	    var user = new User("Kelly");
	    user.say();
	 
	    var decorated = new DecoratedUser(user, "Broadway", "New York");
	    decorated.say();
	 
	    log.show();
	}



	// FACADE
	//-----------------------------------------------------------------//
	var Mortgage = function(name) {
	    this.name = name;
	}
	 
	Mortgage.prototype = {
	 
	    applyFor: function(amount) {
	        // access multiple subsystems...
	        var result = "approved";
	        if (!new Bank().verify(this.name, amount)) {
	            result = "denied";
	        } else if (!new Credit().get(this.name)) {
	            result = "denied";
	        } else if (!new Background().check(this.name)) {
	            result = "denied";
	        }
	        return this.name + " has been " + result +
	               " for a " + amount + " mortgage";
	    }
	}
	 
	var Bank = function() {
	    this.verify = function(name, amount) {
	        // complex logic ...
	        return true;
	    }
	}
	 
	var Credit = function() {
	    this.get = function(name) {
	        // complex logic ...
	        return true;
	    }
	}
	 
	var Background = function() {
	    this.check = function(name) {
	        // complex logic ...
	        return true;
	    }
	}
	 
	function run() {
	    var mortgage = new Mortgage("Joan Templeton");
	    var result = mortgage.applyFor("$100,000");
	 
	    console.log(result);
	}



	// FLYWEIGHT
	//-----------------------------------------------------------------// 
	function Flyweight (make, model, processor) {
	    this.make = make;
	    this.model = model;
	    this.processor = processor;
	};
	 
	var FlyWeightFactory = (function () {
	    var flyweights = {};
	 
	    return {
	 
	        get: function (make, model, processor) {
	            if (!flyweights[make + model]) {
	                flyweights[make + model] = 
	                    new Flyweight(make, model, processor);
	            }
	            return flyweights[make + model];
	        },
	 
	        getCount: function () {
	            var count = 0;
	            for (var f in flyweights) count++;
	            return count;
	        }
	    }
	})();
	 
	function ComputerCollection () {
	    var computers = {};
	    var count = 0;
	 
	    return {
	        add: function (make, model, processor, memory, tag) {
	            computers[tag] = 
	                new Computer(make, model, processor, memory, tag);
	            count++;
	        },
	 
	        get: function (tag) {
	            return computers[tag];
	        },
	 
	        getCount: function () {
	            return count;
	        }
	    };
	}
	 
	var Computer = function (make, model, processor, memory, tag) {
	    this.flyweight = FlyWeightFactory.get(make, model, processor);
	    this.memory = memory;
	    this.tag = tag;
	    this.getMake = function () {
	        return this.flyweight.make;
	    }
	    // ...
	}
	 
	// log helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var computers = new ComputerCollection();
	    
	    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
	    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
	    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
	    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
	    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
	    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
	    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");
	 
	    log.add("Computers: " + computers.getCount());
	    log.add("Flyweights: " + FlyWeightFactory.getCount());
	    log.show();
	}



	// PROXY
	//-----------------------------------------------------------------//
	function GeoCoder() {
	 
	    this.getLatLng = function(address) {
	        
	        if (address === "Amsterdam") {
	            return "52.3700° N, 4.8900° E";
	        } else if (address === "London") {
	            return "51.5171° N, 0.1062° W";
	        } else if (address === "Paris") {
	            return "48.8742° N, 2.3470° E";
	        } else if (address === "Berlin") {
	            return "52.5233° N, 13.4127° E";
	        } else {
	            return "";
	        }
	    };
	}
	 
	function GeoProxy() {
	    var geocoder = new GeoCoder();
	    var geocache = {};
	 
	    return {
	        getLatLng: function(address) {
	            if (!geocache[address]) {
	                geocache[address] = geocoder.getLatLng(address);
	            }
	            log.add(address + ": " + geocache[address]);
	            return geocache[address];
	        },
	        getCount: function() {
	            var count = 0;
	            for (var code in geocache) { count++; }
	            return count;
	        }
	    };
	};
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var geo = new GeoProxy();
	 
	    // geolocation requests
	 
	    geo.getLatLng("Paris");
	    geo.getLatLng("London");
	    geo.getLatLng("London");
	    geo.getLatLng("London");
	    geo.getLatLng("London");
	    geo.getLatLng("Amsterdam");
	    geo.getLatLng("Amsterdam");
	    geo.getLatLng("Amsterdam");
	    geo.getLatLng("Amsterdam");
	    geo.getLatLng("London");
	    geo.getLatLng("London");
	 
	    log.add("\nCache size: " + geo.getCount());
	    log.show();
	}


//--------------------------------------------------------------------------//
// BEHAVIORAL
//--------------------------------------------------------------------------//


	// CHAIN OF RESPONSIBILITY
	//-----------------------------------------------------------------//
	var Request = function(amount) {
	    this.amount = amount;
	    log.add("Requested: $" + amount + "\n");
	}
	 
	Request.prototype = {
	    get: function(bill) {
	        var count = Math.floor(this.amount / bill);
	        this.amount -= count * bill;
	        log.add("Dispense " + count + " $" + bill + " bills");
	        return this;
	    }
	}
	 
	// log helper 
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var request = new Request(378);
	 
	    request.get(100).get(50).get(20).get(10).get(5).get(1);
	 
	    log.show();
	}



	// COMMAND
	//-----------------------------------------------------------------//
	 
	function add(x, y) { return x + y; }
	function sub(x, y) { return x - y; }
	function mul(x, y) { return x * y; }
	function div(x, y) { return x / y; }
	 
	var Command = function (execute, undo, value) {
	    this.execute = execute;
	    this.undo = undo;
	    this.value = value;
	}
	 
	var AddCommand = function (value) {
	    return new Command(add, sub, value);
	};
	 
	var SubCommand = function (value) {
	    return new Command(sub, add, value);
	};
	 
	var MulCommand = function (value) {
	    return new Command(mul, div, value);
	};
	 
	var DivCommand = function (value) {
	    return new Command(div, mul, value);
	};
	 
	var Calculator = function () {
	    var current = 0;
	    var commands = [];
	 
	    function action(command) {
	        var name = command.execute.toString().substr(9, 3);
	        return name.charAt(0).toUpperCase() + name.slice(1);
	    }
	 
	    return {
	        execute: function (command) {
	            current = command.execute(current, command.value);
	            commands.push(command);
	            log.add(action(command) + ": " + command.value);
	        },
	 
	        undo: function () {
	            var command = commands.pop();
	            current = command.undo(current, command.value);
	            log.add("Undo " + action(command) + ": " + command.value);
	        },
	 
	        getCurrentValue: function () {
	            return current;
	        }
	    }
	}
	 
	// log helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var calculator = new Calculator();
	 
	    // issue commands
	 
	    calculator.execute(new AddCommand(100));
	    calculator.execute(new SubCommand(24));
	    calculator.execute(new MulCommand(6));
	    calculator.execute(new DivCommand(2));
	 
	    // reverse last two commands
	 
	    calculator.undo();
	    calculator.undo();
	 
	    log.add("\nValue: " + calculator.getCurrentValue());
	    log.show();
	}



	// INTERPRETER
	//-----------------------------------------------------------------//
	var Context = function (input) {
	    this.input = input;
	    this.output = 0;
	}
	 
	Context.prototype = {
	    startsWith : function (str) {
	        return this.input.substr(0, str.length) === str;
	    }
	}
	 
	var Expression = function (name, one, four, five, nine, multiplier) {
	    this.name = name;
	    this.one = one;
	    this.four = four;
	    this.five = five;
	    this.nine = nine;
	    this.multiplier = multiplier;
	}
	 
	Expression.prototype = {
	    interpret: function (context) {
	        if (context.input.length == 0) {
	            return;
	        }
	        else if (context.startsWith(this.nine)) {
	            context.output += (9 * this.multiplier);
	            context.input = context.input.substr(2);
	        }
	        else if (context.startsWith(this.four)) {
	            context.output += (4 * this.multiplier);
	            context.input = context.input.substr(2);
	        }
	        else if (context.startsWith(this.five)) {
	            context.output += (5 * this.multiplier);
	            context.input = context.input.substr(1);
	        }
	        while (context.startsWith(this.one)) {
	            context.output += (1 * this.multiplier);
	            context.input = context.input.substr(1);
	        }
	    }
	}
	 
	function run() {
	    var roman = "MCMXXVIII"
	    var context = new Context(roman);
	    var tree = [];
	 
	    tree.push(new Expression("thousand", "M", " " , " ", " " , 1000));
	    tree.push(new Expression("hundred",  "C", "CD", "D", "CM", 100));
	    tree.push(new Expression("ten",      "X", "XL", "L", "XC", 10));
	    tree.push(new Expression("one",      "I", "IV", "V", "IX", 1));
	 
	    for (var i = 0, len = tree.length; i < len; i++) {
	        tree[i].interpret(context);
	    }
	 
	    console.log(roman + " = " + context.output);
	}



	// ITERATOR
	//-----------------------------------------------------------------//
	var Iterator = function(items) {
	    this.index = 0;
	    this.items = items;
	}
	 
	Iterator.prototype = {
	    first: function() {
	        this.reset();
	        return this.next();
	    },
	    next: function() {
	        return this.items[this.index++];
	    },
	    hasNext: function() {
	        return this.index <= this.items.length;
	    },
	    reset: function() {
	        this.index = 0;
	    },
	    each: function(callback) {
	        for (var item = this.first(); this.hasNext(); item = this.next()) {
	            callback(item);
	        }
	    }
	}
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var items = ["one", 2, "circle", true, "Applepie"];
	    var iter = new Iterator(items);
	 
	    // using for loop
	 
	    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
	        log.add(item);
	    }
	    log.add("");
	 
	    // using Iterator's each method
	 
	    iter.each(function(item) {
	        log.add(item);
	    });
	 
	    log.show();
	}



	// MEDIATOR
	//-----------------------------------------------------------------//
	var Participant = function(name) {
	    this.name = name;
	    this.chatroom = null;
	};
	 
	Participant.prototype = {
	    send: function(message, to) {
	        this.chatroom.send(message, this, to);
	    },
	    receive: function(message, from) {
	        log.add(from.name + " to " + this.name + ": " + message);
	    }
	};
	 
	var Chatroom = function() {
	    var participants = {};
	 
	    return {
	 
	        register: function(participant) {
	            participants[participant.name] = participant;
	            participant.chatroom = this;
	        },
	 
	        send: function(message, from, to) {
	            if (to) {                      // single message
	                to.receive(message, from);    
	            } else {                       // broadcast message
	                for (key in participants) {   
	                    if (participants[key] !== from) {
	                        participants[key].receive(message, from);
	                    }
	                }
	            }
	        }
	    };
	};
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var yoko = new Participant("Yoko");
	    var john = new Participant("John");
	    var paul = new Participant("Paul");
	    var ringo = new Participant("Ringo");
	 
	    var chatroom = new Chatroom();
	    chatroom.register(yoko);
	    chatroom.register(john);
	    chatroom.register(paul);
	    chatroom.register(ringo);
	 
	    yoko.send("All you need is love.");
	    yoko.send("I love you John.");
	    john.send("Hey, no need to broadcast", yoko);
	    paul.send("Ha, I heard that!");
	    ringo.send("Paul, what do you think?", paul);
	 
	    log.show();
	}



	// MEMENTO
	//-----------------------------------------------------------------//
	var Person = function(name, street, city, state) {
	    this.name = name;
	    this.street = street;
	    this.city = city;
	    this.state = state;
	}
	 
	Person.prototype = {
	 
	    hydrate: function() {
	        var memento = JSON.stringify(this);
	        return memento;
	    },
	 
	    dehydrate: function(memento) {
	        var m = JSON.parse(memento);
	        this.name = m.name;
	        this.street = m.street;
	        this.city = m.city;
	        this.state = m.state;
	    }
	}
	 
	var CareTaker = function() {
	    this.mementos = {};
	 
	    this.add = function(key, memento) {
	        this.mementos[key] = memento;
	    },
	 
	    this.get = function(key) {
	        return this.mementos[key];
	    }
	}
	 
	// log helper
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	 
	function run() {
	    var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
	    var john = new Person("John Wang", "48th Street", "San Jose", "CA");
	    var caretaker = new CareTaker();
	 
	    // save state
	 
	    caretaker.add(1, mike.hydrate());
	    caretaker.add(2, john.hydrate());
	 
	    // mess up their names
	 
	    mike.name = "King Kong";
	    john.name = "Superman";
	 
	    // restore original state
	 
	    mike.dehydrate(caretaker.get(1));
	    john.dehydrate(caretaker.get(2));
	 
	    log.add(mike.name);
	    log.add(john.name);
	 
	    log.show();
	}



	// OBSERVER
	//-----------------------------------------------------------------//
	function Click() {
	    this.handlers = [];  // observers
	}
	 
	Click.prototype = {
	 
	    subscribe: function(fn) {
	        this.handlers.push(fn);
	    },
	 
	    unsubscribe: function(fn) {
	        this.handlers = this.handlers.filter(
	            function(item) {
	                if (item !== fn) {
	                    return item;
	                }
	            }
	        );
	    },
	 
	    fire: function(o, thisObj) {
	        var scope = thisObj || window;
	        this.handlers.forEach(function(item) {
	            item.call(scope, o);
	        });
	    }
	}
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	 
	    var clickHandler = function(item) { 
	        log.add("fired: " + item); 
	    };
	 
	    var click = new Click();
	 
	    click.subscribe(clickHandler);
	    click.fire('event #1');
	    click.unsubscribe(clickHandler);
	    click.fire('event #2');
	    click.subscribe(clickHandler);
	    click.fire('event #3');
	 
	    log.show();
	}



	// STATE
	//-----------------------------------------------------------------//
	var TrafficLight = function () {
	    var count = 0;
	    var currentState = new Red(this);
	 
	    this.change = function (state) {
	        // limits number of changes
	        if (count++ >= 10) return;
	        currentState = state;
	        currentState.go();
	    };
	 
	    this.start = function () {
	        currentState.go();
	    };
	}
	 
	var Red = function (light) {
	    this.light = light;
	 
	    this.go = function () {
	        log.add("Red --> for 1 minute");
	        light.change(new Green(light));
	    }
	};
	 
	var Yellow = function (light) {
	    this.light = light;
	 
	    this.go = function () {
	        log.add("Yellow --> for 10 seconds");
	        light.change(new Red(light));
	    }
	};
	 
	var Green = function (light) {
	    this.light = light;
	 
	    this.go = function () {
	        log.add("Green --> for 1 minute");
	        light.change(new Yellow(light));
	    }
	};
	 
	// log helper
	 
	var log = (function () {
	    var log = "";
	 
	    return {
	        add: function (msg) { log += msg + "\n"; },
	        show: function () { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var light = new TrafficLight();
	    light.start();
	 
	    log.show();
	}



	// STRATEGY
	//-----------------------------------------------------------------//
	var Shipping = function() {
	    this.company = "";
	};
	 
	Shipping.prototype = {
	    setStrategy: function(company) {
	        this.company = company;
	    },
	 
	    calculate: function(package) {
	        return this.company.calculate(package);
	    }
	};
	 
	var UPS = function() {
	    this.calculate = function(package) {
	        // calculations...
	        return "$45.95";
	    }
	};
	 
	var USPS = function() {
	    this.calculate = function(package) {
	        // calculations...
	        return "$39.40";
	    }
	};
	 
	var Fedex = function() {
	    this.calculate = function(package) {
	        // calculations...
	        return "$43.20";
	    }
	};
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var package = { from: "76712", to: "10012", weigth: "lkg" };
	 
	    // the 3 strategies
	 
	    var ups = new UPS();
	    var usps = new USPS();
	    var fedex = new Fedex();
	 
	    var shipping = new Shipping();
	 
	    shipping.setStrategy(ups);
	    log.add("UPS Strategy: " + shipping.calculate(package));
	    shipping.setStrategy(usps);
	    log.add("USPS Strategy: " + shipping.calculate(package));
	    shipping.setStrategy(fedex);
	    log.add("Fedex Strategy: " + shipping.calculate(package));
	 
	    log.show();
	}



	// TEMPLATE METHOD
	//-----------------------------------------------------------------//
	var datastore = {
	    process: function() {
	        this.connect();
	        this.select();
	        this.disconnect();
	        return true;
	    }
	};
	 
	function inherit(proto) {
	    var F = function() { };
	    F.prototype = proto;
	    return new F();
	}
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	    var mySql = inherit(datastore);
	 
	    // implement template steps
	 
	    mySql.connect = function() {
	        log.add("MySQL: connect step");
	    };
	 
	    mySql.select = function() {
	        log.add("MySQL: select step");
	    };
	 
	    mySql.disconnect = function() {
	        log.add("MySQL: disconnect step");
	    };
	 
	    mySql.process();
	 
	    log.show();
	}



	// VISITOR
	//-----------------------------------------------------------------//
	var Employee = function (name, salary, vacation) {
	    var self = this;
	        
	    this.accept = function (visitor) {
	        visitor.visit(self);
	    };
	 
	    this.getName = function () {
	        return name;
	    };
	 
	    this.getSalary = function () {
	        return salary;
	    };
	 
	    this.setSalary = function (sal) {
	        salary = sal;
	    };
	 
	    this.getVacation = function () {
	        return vacation;
	    };
	 
	    this.setVacation = function (vac) {
	        vacation = vac;
	    };
	};
	 
	var ExtraSalary = function () {
	    this.visit = function (emp) {
	        emp.setSalary(emp.getSalary() * 1.1);
	    };
	};
	 
	var ExtraVacation = function () {
	    this.visit = function (emp) {
	        emp.setVacation(emp.getVacation() + 2);
	    };
	};
	 
	// log helper
	 
	var log = (function() {
	    var log = "";
	 
	    return {
	        add: function(msg) { log += msg + "\n"; },
	        show: function() { console.log(log); log = ""; }
	    }
	})();
	 
	function run() {
	        
	    var employees = [
	        new Employee("John", 10000, 10),
	        new Employee("Mary", 20000, 21),
	        new Employee("Boss", 250000, 51)
	    ];
	 
	    var visitorSalary = new ExtraSalary();
	    var visitorVacation = new ExtraVacation();
	        
	    for (var i = 0, len = employees.length; i < len; i++) {
	        var emp = employees[i];
	            
	        emp.accept(visitorSalary);
	        emp.accept(visitorVacation);
	        log.add(emp.getName() + ": $" + emp.getSalary() +
	            " and " + emp.getVacation() + " vacation days");
	    }
	 
	    log.show();
	}
