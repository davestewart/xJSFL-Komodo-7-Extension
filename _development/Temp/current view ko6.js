var view = ko.views.manager.currentView
alert((view.document || view.koDoc).file.URI)