const person_schema1 = new Schema({ 
	name: String // [String here is a global constructor]
}); // name will be cast to string

const person_schema2 = new Schema({ 
	name: 'String'  // ['String' here is just a string]
}); // Equivalent

const person_schema3 = new Schema({
	name: {
		type: String //  [String here is passed to the type key]
	}
})

const person_scheme4_mistake = new Schema({
	// You might expect `child` to be an object that has 3 properties,
	// but unfortunately `type` is special in Mongoose so mongoose
	// interprets this schema to mean that `child` is a string
	child: {
		type: String,
		firstname: String,
		lastname: String
	}
});

const person_scheme4_solution = new Schema({
	// Workaround to make sure Mongoose knows `child` is an object
	// and `child.type` is a string, rather than thinking `child`
	// is a string.
	child: {
		type: { type: String },
		firstname: String,
		lastname: String
	}
});


const string_properties = new Schema({
    status: {
        type: String, 
        required: true, 
        enum: ['Available', 'Archived', 'Down', 'Roasted'], 
        default: 'Available'
	},		

    essay: {
        type: String, 
        required: true, 
        minlength: 50, 
        maxlength: 1005
	},	

})


const flight_schema = new Schema({

    engines: Number, // [Number here as a global constructor]

    tickets: {
        type: 'Number'// ['Number' here as just a string]
    },      

    attandants: { 
        type: Number, // attandants will be cast to a Number
        min: 5, 
        max: 100
    },

})

const date_schema = new Schema({

    date: {
      type: Date, //date will be cast to a Number
      default: Date.now //sets the default date to the currentDate
    },

})


const boolean_schema = new Schema({

    draft: {
        type: Boolean, //draft will be cast to a boolean
        default: true
    },

})


const connectSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,
    network: {type: String, required: true },
    responseTime: {type: String, required: true},
    callbacks: {type: String, required: true }

});



const hacker_network = new Schema({

  root_connections: [connectSchema], // document array
  ip_address: [String], // an array of a strings
  injection_sequence: [Number] // an array of numbers

});



const humandriodSchema = new Schema({
  // `features` is a map whose values are strings. A map's
  // keys are always strings. You specify the type of values using `of`.
    features: {
        type: Map,
        of: String
    }
});

const humandriod = mongoose.model('Driod', humandriodSchema);



const humandriod_attributes = new humandriod({
    features: {
        skills: 'Entertainment',
        memory: '1200 TB'
    }
}).features

console.log(humandriod_attributes)
// Map results =>  { 'skills' => 'Entertainment', 'memory' => '1200 TB' }


const humandriod_attributes = new humandriod({
  features: {}
});

// use this to a value to a key
humandriod_attributes.features.set('version', '12.3.4.5');

// Equivalent
humandriod_attributes.set('features.uptime', '2.5 years');


// Map doesn't work this way, new_feature_key & its value will
// not be saved
humandriod_attributes.features.new_feature_key = 'new_feature_value';

// 'Entertainment'
console.log(humandriod_attributes.features.get('skills'));

// '12.3.4.5''
console.log(humandriod_attributes.get('features.version'));


// returns 'undefined', you MUST use 'get' to retrieve
// a value for a given key
humandriod_attributes.features.skills;


// Will only save the 'version' and 'uptime' properties
user.save();


