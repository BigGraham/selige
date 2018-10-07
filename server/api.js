//server\api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');


/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  const _eventListProjection = '_id title forename surname startDatetime endDatetime otherNames birthDate NINO creation_date';

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find({},
      _eventListProjection, (err, events) => {
        let eventsArr = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (events) {
          events.forEach(event => {
            eventsArr.push(event);
          });
        }
        res.send(eventsArr);
      }
    );
  });

  // GET list of all events, public and private (admin only)
  app.get('/api/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
        let eventsArr = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (events) {
          events.forEach(event => {
            eventsArr.push(event);
          });
        }
        res.send(eventsArr);
      }
    );
  });

  // GET event by event ID
  app.get('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }

      res.send(event);
    });
  });

  // GET RSVPs by event ID
  app.get('/api/event/:eventId/rsvps', jwtCheck, (req, res) => {
    Rsvp.find({eventId: req.params.eventId}, (err, rsvps) => {
      let rsvpsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (rsvps) {
        rsvps.forEach(rsvp => {
          rsvpsArr.push(rsvp);
        });
      }
      res.send(rsvpsArr);
    });
  });

  // GET list of upcoming events user has RSVPed to
  app.get('/api/events/:userId', jwtCheck, (req, res) => {
    Rsvp.find({userId: req.params.userId}, 'eventId', (err, rsvps) => {
      const _eventIdsArr = rsvps.map(rsvp => rsvp.eventId);
      const _rsvpEventsProjection = 'title startDatetime endDatetime';
      let eventsArr = [];

      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (rsvps) {
        Event.find(
          {_id: {$in: _eventIdsArr}, startDatetime: { $gte: new Date() }},
          _rsvpEventsProjection, (err, events) => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          if (events) {
            events.forEach(event => {
              eventsArr.push(event);
            });
          }
          res.send(eventsArr);
        });
      }
    });
  });

  // POST a new event
  app.post('/api/event/new', jwtCheck, adminCheck, (req, res) => {
      
      const event = new Event({
        gender: req.body.gender,
        title: req.body.title,
        otherTitle : req.body.otherTitle,
        forename : req.body.forename,
        surname : req.body.surname,
        otherNames: req.body.otherNames,
        otherForename : req.body.otherForename,
        otherSurname : req.body.otherSurname,
        mothersMaiden : req.body.mothersMaiden,
        birthDate : req.body.birthDate,
        countryOfBirth : req.body.countryOfBirth,
        townOfBirth : req.body.townOfBirth,
        nationality : req.body.nationality,
        hasUKNINO : req.body.hasUKNINO,
        NINO : req.body.NINO,
        hasPassport : req.body.hasPassport,
        passportNo : req.body.passportNo,
        passportCountry : req.body.passportCountry,
        hasDrivingLicence : req.body.hasDrivingLicence,
        drivingLicence: req.body.drivingLicence,
        licenceCountry : req.body.licenceCountry,
        ElectricitySupplierNumber : req.body.ElectricitySupplierNumber,
        NatEntCardNo: req.body.NatEntCardNo,
        IsNICAvailable : req.body.IsNICAvailable,
        NICNumber: req.body.NICNumber,
        NICCountryOfIssue : req.body.NICCountryOfIssue,
        PVGSchemeID : req.body.PVGSchemeID,
        EmailAddress : req.body.EmailAddress,
        EveningPhoneNumber : req.body.EveningPhoneNumber,
        DaytimePhoneNumber : req.body.DaytimePhoneNumber,
        currResidentFrom : req.body.currResidentFrom,
        currAddrLine1 : req.body.currAddrLine1,
        currAddrLine2 : req.body.currAddrLine2,
        currAddrTown : req.body.currAddrTown,
        currAddrCounty : req.body.currAddrCounty,
        currAddrPostCode : req.body.currAddrPostCode,
        currAddrCountry : req.body.currAddrCountry,        
        otherDetails : req.body.otherDetails,
        applicationNo : null,
        caseRefNo : null,
        indicativeNotice : null
      });
      event.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        // Audit the event
          const rsvp = new Rsvp({
             userId: req.body.userId,
             comments: 'Created Application',
             commentType : 'Audit',
             eventId: event.id
            });
          rsvp.save((err) => 
          {
           if (err) {
              return res.status(500).send({message: err.message});
                    }
          }
         );
        res.send(event);
      });
    });

  // PUT (edit) an existing event
  app.put('/api/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }


      

      event.gender = req.body.gender;
      event.title = req.body.title;
      event.otherTitle = req.body.otherTitle;
      event.forename = req.body.forename;
      event.surname = req.body.surname;
      event.otherNames = req.body.otherNames;
      event.otherForename = req.body.otherForename;
      event.otherSurname = req.body.otherSurname;
      event.mothersMaiden = req.body.mothersMaiden;
      event.birthDate = req.body.birthDate;
      event.countryOfBirth = req.body.countryOfBirth;
      event.townOfBirth = req.body.townOfBirth;
      event.nationality = req.body.nationality;
      event.hasUKNINO =  req.body.hasUKNINO;
      event.NINO =  req.body.NINO;
      event.hasPassport =  req.body.hasPassport;
      event.passportNo =  req.body.passportNo;
      event.passportCountry =  req.body.passportCountry;
      event.hasDrivingLicence =  req.body.hasDrivingLicence;
      event.drivingLicence = req.body.drivingLicence;
      event.licenceCountry =  req.body.licenceCountry;
      event.ElectricitySupplierNumber = req.body.ElectricitySupplierNumber;
      event.NatEntCardNo  = req.body.NatEntCardNo;
      event.IsNICAvailable  = req.body.IsNICAvailable;
      event.NICNumber  = req.body.NICNumber;
      event.NICCountryOfIssue  = req.body.NICCountryOfIssue;
      event.PVGSchemeID  = req.body.PVGSchemeID;
      event.EmailAddress  = req.body.EmailAddress;
      event.EveningPhoneNumber  = req.body.EveningPhoneNumber;
      event.DaytimePhoneNumber  = req.body.DaytimePhoneNumber; 
      event.currResidentFrom  = req.body.currResidentFrom;  
      event.currAddrLine1 = req.body.currAddrLine1;
      event.currAddrLine2 = req.body.currAddrLine2;
      event.currAddrTown = req.body.currAddrTown;
      event.currAddrCounty = req.body.currAddrCounty;
      event.currAddrPostCode = req.body.currAddrPostCode;
      event.currAddrCountry = req.body.currAddrCountry;
      event.otherDetails = req.body.otherDetails;
          

      event.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }

       // Audit the event
          const rsvp = new Rsvp({
             userId: req.body.userId,
             comments: 'Updated Application',
             commentType : 'Audit',
             eventId: req.params.id
            });
          rsvp.save((err) => 
          {
           if (err) {
              return res.status(500).send({message: err.message});
                    }
          }
         );


    // return

        res.send(event);
      });




    });
  });

  // DELETE an event and all associated RSVPs
  app.delete('/api/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      Rsvp.find({eventId: req.params.id}, (err, rsvps) => {
        if (rsvps) {
          rsvps.forEach(rsvp => {
            rsvp.remove();
          });
        }
        event.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Event and RSVPs successfully deleted.'});
        });
      });
    });
  });

  // POST a new RSVP
  app.post('/api/rsvp/new', jwtCheck, (req, res) => {
    Rsvp.findOne({eventId: req.body.eventId, userId: req.body.userId}, (err, existingRsvp) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingRsvp) {
        return res.status(409).send({message: 'You have already RSVPed to this event.'});
      }
      const rsvp = new Rsvp({
        userId: req.body.userId,
        name: req.body.name,
        eventId: req.body.eventId,
        attending: req.body.attending,
        guests: req.body.guests,
        comments: req.body.comments
      });
      rsvp.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(rsvp);
      });
    });
  });

// POST a new RSVP
  app.post('/api/rsvp/new', jwtCheck, (req, res) => {
      const rsvp = new Rsvp({
        userId: req.body.userId,
        name: req.body.name,
        eventId: req.body.eventId,
        attending: req.body.attending,
        guests: req.body.guests,
        comments: req.body.comments
      });
      rsvp.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(rsvp);
      });
    });





  // PUT (edit) an existing RSVP
  app.put('/api/rsvp/:id', jwtCheck, (req, res) => {
    Rsvp.findById(req.params.id, (err, rsvp) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!rsvp) {
        return res.status(400).send({message: 'RSVP not found.'});
      }
      if (rsvp.userId !== req.user.sub) {
        return res.status(401).send({message: 'You cannot edit someone else\'s RSVP.'});
      }
      rsvp.name = req.body.name;
      rsvp.attending = req.body.attending;
      rsvp.guests = req.body.guests;
      rsvp.comments = req.body.comments;

      rsvp.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(rsvp);
      });
    });
  });

};
