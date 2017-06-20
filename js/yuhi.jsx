var FormattedText = React.createClass({
    render: function() {
        var formattedText = this.props.text.split('\n').map(function(item, key) {
          return (
            <span key={key}>
              {item}
              <br/>
            </span>
          );
        });

        return <p>{formattedText}</p>;
    }
});


var MenuBarComponent = React.createClass({
    render: function() {
        if (this.props.section == null) return null;

        var menuItems = this.props.section.map(function(elt, i) {
            return <li key={i}><a href={elt.ref} title={elt.title} className="smoothScroll">{elt.title}</a></li>;
        });
        var menuOptions = this.props.section.map(function(elt, i) {
            return <option key={i} value={elt.ref}>{elt.title}</option>;
        });

        return (
            <aside>
                <nav>
                    <ul>
                        {menuItems}
                    </ul>
                    <a href=""></a>
                </nav>
                <nav className="mobileOnly">
                    <h3>Menu</h3>
                    <select> 
                        {menuOptions}
                    </select>
                </nav>
            </aside>
        );
    }
});

var HomeComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;
        return (
            <div className="wrapper">
                <section className={this.props.section.id}>
                    <section className="subSection">
                        <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                        <p>{this.props.section.caption}</p>
                    </section>
                    <ScheduleComponent section={this.props.section.subSections[0]} />
                    <AddressComponent section={this.props.section.subSections[1]} />
                </section>
            </div>
        );
    }
});


var TeachersComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;

        var teacherList = this.props.section.teachers.map(function(elt, i) {
            return <li key={i}><img src={'img/' + elt.avatar} /><span className="caption">{elt.name}<br/>{elt.grade}</span></li>;
        });
        return (
            <div className="wrapper">
                <div className="bgimg"></div>
                <section className={this.props.section.id}>
                    <div className="subSection">
                        <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                        <ul className="media">
                            {teacherList}
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
});

var ScheduleComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;

        var scheduleList = this.props.section.schedule.map(function(elt, i) {
            return <li key={i}><b>{elt.day}:</b>De {elt.period.from} à {elt.period.from} <br/> {elt.place}</li>;
        });
        return (
            <section className="subSection">
                <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                <ul className="list">
                    {scheduleList}
                </ul>
            </section>
        );
    }
});

var AddressComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;

        var addressList = this.props.section.address.map(function(elt, i) {
            return <li key={i}><b>{elt.name}:</b><FormattedText text={elt.location} /></li>;
        });
        return (
            <section className="subSection">
                <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                <ul className="list">
                    {addressList}
                </ul>
            </section>
        );
    }
});

var AgendaComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;

        var notificationSection = this.props.section.subSections[0];
        var warningSection = this.props.section.subSections[1];
        var examinationSection = this.props.section.subSections[2];

        return (
            <div className="wrapper">
                <div className="bgimg"></div>
                <section className={this.props.section.id}>
                    <section className="subSection">
                        <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                        <section className="subSubSection">
                            <h3 id={notificationSection.id}>{notificationSection.title}</h3>
                            <FormattedText text={notificationSection.caption} />
                        </section>
                        <section className="subSubSection">
                            <h3 id={warningSection.id}>{warningSection.title}</h3>
                            <FormattedText text={warningSection.caption} />
                        </section>
                        <section className="subSubSection">
                            <h3 id={examinationSection.id}>{examinationSection.title}</h3>
                            <FormattedText text={examinationSection.caption} />
                        </section>
                    </section>
                </section>
            </div>
        );
    }
});

var ContactComponent = React.createClass({   
    render: function() {
        if (this.props.section == null) return null;
   
        var contactList = this.props.section.contact.map(function(elt, i) {
            return <img key={i} src={"/img/" + elt.image} width="250" height="auto" />;
        });

        return (
            <div className="wrapper">
                <div className="bgimg"></div>
                <section className={this.props.section.id}>
                    <div className="subSection">
                        <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                        <div className="media">
                            {contactList}
                            {this.props.section.caption}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
});

var GlossaryComponent = React.createClass({   
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        var self = this;
        console.log("loading " + self.props.source);
        this.serverRequest = $.getJSON(this.props.source, function(data) {
            console.log("loaded " + self.props.source);
            self.setState(data);
        }.bind(self));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        if (this.state.terms == null) return null;

        var termList = this.state.terms.map(function(elt, i) {
            return <li key={i}><b>{elt.name}:</b>{' ' + elt.definition}</li>;
        });

        return (
            <div className="wrapper">
                <div className="bgimg"></div>
                <section className="glossary">
                    <div className="subSection">
                        <h3 id={this.props.section.id}>{this.props.section.title}</h3>
                        <ul className="list">
                            {termList}
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
});


var YuhiApp = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        /*
        var self = this;
        console.log("loading " + self.props.source);
        fetch(self.props.source)
        .then(function(response) {
            if (response.status >= 400) throw new Error("Bad response from server");
            return response.json().then(function(data) {
                console.log(self.props.source + " loaded");
                self.setState(data);
                self.jqueryHandle();
            });
        }).catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });
        */
        var self = this;
        console.log("loading " + self.props.source);
        this.serverRequest = $.getJSON(this.props.source, function(data) {
            console.log("loaded " + self.props.source);
            self.setState(data);
            self.jqueryHandle();
        }.bind(self));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    jqueryHandle: function() {
        //new WOW().init();

        console.log("app loaded, initializing jQuery");

        $("aside").hide();

        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 550) {
                $("aside").fadeIn();
            } else {
                $("aside").fadeOut();
            }
        });

        $("a.smoothScroll").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate(
                    {
                        scrollTop: $(hash).offset().top
                    }, 
                    800, 
                    function(){
                        window.location.hash = hash;
                    }
                );
            }
        });

        $("nav select").on('change', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = $("nav select").val();
                $('html, body').animate(
                    {
                        scrollTop: $(hash).offset().top
                    }, 
                    800, 
                    function(){
                        window.location.hash = hash;
                    }
                );
            }
        });

    },

    render: function() {
        if (this.state.title == null) return null;

        return (
            <div className="container">
                <MenuBarComponent section={this.state.menuSection} />
                <main>
                    <div className="wrapper">
                        <section className="splash">
                            <a className="smoothScroll" href="#home">
                                <span className="caption">{this.state.splashSection}</span>
                            </a>
                        </section>
                    </div>
                    <HomeComponent section={this.state.homeSection} />
                    <TeachersComponent section={this.state.teacherSection} />
                    <AgendaComponent section={this.state.agendaSection} />
                    <ContactComponent section={this.state.contactSection} />
                    <GlossaryComponent section={this.state.glossarySection} source="/data/glossary.json" />
                </main>
            </div>
        );
    }
});


ReactDOM.render(
  <YuhiApp source="/data/yuhi.json" />,
  document.getElementById("app")
);