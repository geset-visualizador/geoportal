window.onload = init;



function init (){


  var layers = [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
      crossOrigin: 'anonymous'
    })
  ];

var vectorSource = new ol.source.Vector({
  url: 'https://raw.githubusercontent.com/geset-visualizador/geoportal/main/features.json',
  format: new ol.format.GeoJSON() ,
  crossOrigin: 'anonymous'
});


    var view = new ol.View ({
        center: [-7628622.7,-3702611.8],
        zoom: 14,
        maxZoom: 17,
        minZoom: 5,
    });

    const map = new ol.Map ({
        view: view ,

        layers: layers,
        target: 'js-Mapa'
    })

    map.addLayer(new ol.layer.Vector({
      name: 'Departements',
      source: vectorSource,
      
      style: new ol.style.Style({
        image: new ol.style.Icon({
          //color: '#080600',
          crossOrigin: null,
          src: 'Imagenes/org.png',
          scale: .6
      })
        
    })
    
  })
    );
  
    // Select  interaction
    var select = new ol.interaction.Select({
      hitTolerance: 5,
      multi: true,
      condition: ol.events.condition.singleClick,
      style: new ol.style.Style({
        image: new ol.style.Icon({
          //color: '#c91818',
          crossOrigin: null,
          src: 'Imagenes/org1.png',
          scale: 1.2
      })
        
    })
    });
    map.addInteraction(select);
  
    // Select control
    var popup = new ol.Overlay.PopupFeature({
      popupClass: 'default anim',
      select: select,
      canFix: true,
      keepSelection: false,
      template: {
        title: 
         
          function(f) {
            return f.get('siglas');
          },
        attributes: 
        {
          'nombre': { title: 'Nombre' },
          'rama': { title: 'Rama de Actividad' },
          'estado': { title: 'Estado' },
          'grado': { title: 'Grado' },
          'fecha_fund': { title: 'Año de fundación ' },
          'federacion': { title: 'Federación' },
          'no_de_afil': { title:  'Nº Afiliados/as'  },
          'condeferac': { title:  'Confederación'  },
          'cuota sind': { title:  'Cuota Sindical'  },
          'resolucion': { title:  'Resolución ministerial'  },
          'año_resol': { title:  'Año de resolución'  },
          'telefono': { title: 'Teléfono' },
            'web':{ title: 'Página Web' },
            /*
            { title: 'Página Web', 
                    before: '<a href="',
                    after: '" target="_blank">Link</a>'
          
          },*/
          'secretaria': { title: 'Secretaría General' },
          'domicilio': { title: 'Domicilio' },
          /* 'id': {
        title: 'Flag',  // attribute's title
        before: '<img src="https://www.crwflags.com/fotw/images/f/fr-',
        after: '.gif">'
       }
       */
          
        }
    }
    });
    map.addOverlay (popup);

 

  function getTitle(feature) {
    var searchedTxt = feature.get('siglas') + ', ' + feature.get('nombre');
    return(searchedTxt);
  }
    
 
  // Set the control grid reference
  var search = new ol.control.SearchFeature({
    placeholder: 'Búsqueda de sindicatos',
    source: vectorSource,
    maxItems: 20,
    getTitle:getTitle,
    
  });
  map.addControl (search);




  // Select feature when click on the reference index
  search.on('select', function(e) {
    popup.hide();
    select.getFeatures().clear();
    select.getFeatures().push (e.search);
    
    
    var p = e.search.getGeometry().getFirstCoordinate();
    
    map.getView().animate({ center:p,zoom: 15,
      duration: 1000 });

    popup.show(e.search,e.search,e.search);
  });

}


