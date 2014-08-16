(function( $, _, Backbone, undefined ) {

	/**
	 * Models
	 */

	var Activity = Backbone.Model.extend( {
		defaults: {
			age: 30,
			name: 'Guest User',
			occupation: 'worker'
		}
	});


	/**
	 * Collections
	 */

	var ActivityCollection = Backbone.Collection.extend( {
		model: Activity
	} );


	/**
	 * Views
	 */

	var ActivityListView = Backbone.View.extend( {
		className: 'activities',
		tagName:   'ul',

		render: function() {
			this.collection.each( function( activity ) {
				var activityView = new ActivityItem( { model: activity } );
				this.$el.append( activityView.render().el );
			}, this );

			return this;
		}
	} );

	var ActivityItem = Backbone.View.extend({
		tagName:  'li',
		template: _.template( $( '#activityItemTemplate' ).html() ),
		
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	} );

	/**
	 * Data initialisation / initialise the main view
	 */
	var activityCollection = new ActivityCollection( [
		{
			age:  26,
			name: 'Mohit Jain'
		},
		{
			age:        25,
			name:       'Taroon Tyagi',
			occupation: 'web designer'
		},
		{
			name:       'Rahul Narang',
			occupation: 'Java Developer'
		}
	] );

	var activityListView = new ActivityListView( { collection: activityCollection } );


	/**
	 * “Begin at the beginning," the King said, very gravely, "and go on till you come to the end: then stop.”
	 *
	 *  -- Lewis Carroll
	 */
	$( document ).ready( function() {
		$( document.body ).append( activityListView.render().el );
	} );

})( jQuery, _, Backbone );