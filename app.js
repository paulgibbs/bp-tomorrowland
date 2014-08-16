(function( $, _, Backbone, undefined ) {
	// I don't care too much that these are in gloval scope.
	var Activity, ActivityCollection, ActivityListView, ActivityItem,
		activityCollection, activityListView;


	/**
	 * Models
	 */

	Activity = Backbone.Model.extend( {
		urlRoot: 'https://private-f0fb3-bptomorrowland.apiary-mock.com/activity/'
	} );


	/**
	 * Collections
	 */

	ActivityCollection = Backbone.Collection.extend( {
		model: Activity,
		url:   'https://private-f0fb3-bptomorrowland.apiary-mock.com/activity'
	} );


	/**
	 * Views
	 */

	ActivityListView = Backbone.View.extend( {
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

	ActivityItem = Backbone.View.extend({
		tagName:  'li',
		template: _.template( $( '#activityItemTemplate' ).html() ),
		
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	} );


	/**
	 * Data initialisation / initialise the main page view.
	 */

	activityCollection = new ActivityCollection().fetch( {
		success: function( activityCollection ) {
			activityListView = new ActivityListView( { collection: activityCollection } );


			/**
			 * “Begin at the beginning," the King said, very gravely, "and go on till you come to the end: then stop.”
			 *
			 *  -- Lewis Carroll
			 */
			$( document ).ready( function() {
				$( document.body ).append( activityListView.render().el );
			} );
		}
	} );
})( jQuery, _, Backbone );