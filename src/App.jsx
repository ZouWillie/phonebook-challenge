import { useEffect, useMemo, useState } from "react";
import "./App.css";
import nerdlogo from "/src/assets/nerd.jpg";

const FALLBACK_CONTACTS = [
    {id: 1, name: "Winnie Pooh", phone: "(555) 010-0101", email: "winnie@cartoon.com", avatar: "https://martinishot.blog/wp-content/uploads/2023/02/winnie-the-pooh-blog-roll-1657830665072.png?w=1024&h=666&crop=1"},
    {id: 2, name: "Buzz Lightyear", phone: "(555) 010-0102", email: "buzz@cartoon.com", avatar: "https://lumiere-a.akamaihd.net/v1/images/b_toystory_characterbanner_buzz_mobile_gradient_v2_14ddf7ec.jpeg?region=0,0,640,480"},
    {id: 3, name: "Pink Panther", phone: "(555) 010-0103", email: "pink@cartoon.com", avatar: "https://yt3.googleusercontent.com/ytc/AIdro_lEeZP6Urk3JhCp_BnVamf57KSdAv-ZJb2nJqHmW-8ZIuM=s900-c-k-c0x00ffffff-no-rj"},
    {id: 4, name: "Mickey Mouse", phone: "(555) 010-0104", email: "mickey@cartoon.com", avatar: "https://easydrawingguides.com/wp-content/uploads/2022/08/how-to-draw-an-easy-mickey-mouse-face-featured-image-1200.png"},
    {id: 5, name: "Homer Simpson", phone: "(555) 010-0105", email: "homer@cartoon.com", avatar: "https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"},
    {id: 6, name: "Peter Griffin", phone: "(555) 010-0106", email: "peter@cartoon.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG2A1WfO0dN2giiE4ggozrg00TrLaEf6kYZA&s"},
    {id: 7, name: "Bugs Bunny", phone: "(555) 010-0107", email: "bugs@cartoon.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_XHzGTE3HpXsIxhHfE64xpu_piJ4F8xxlw&s"},
    {id: 8, name: "Ash Ketchum", phone: "(555) 010-0108", email: "ash@cartoon.com", avatar: "https://a.storyblok.com/f/178900/640x360/265ca1d706/fc7d4a1a97d0585865899c47bdd892bf1633531442_main.jpg/m/filters:quality(95)format(webp)"},
    {id: 9, name: "Patrick Star", phone: "(555) 010-0109", email: "patrick@cartoon.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5l_1bq9Uqs2aTCU7ogxwo22TsivnvSd-enQ&s"},
    {id: 10, name: "Daffy Duck", phone: "(555) 010-0110", email: "daffy@cartoon.com", avatar: "https://assets.dragoart.com/images/12030_501/how-to-draw-daffy-easy_5e4c9f4e871012.02767612_54198_3_4.gif"},
    {id: 11, name: "Scooby Doo", phone: "(555) 010-0111", email: "scooby@cartoon.com", avatar: "https://i.pinimg.com/736x/4e/ff/0e/4eff0ee0b3473ae1a490fde487eef7a8.jpg"},
    {id: 12, name: "Jerry Mouse", phone: "(555) 010-0112", email: "jerry@cartoon.com", avatar: "https://cdn.hanna-barberawiki.com/thumb/5/52/T%26JS_1975_Jerry.png/300px-T%26JS_1975_Jerry.png"},
    {id: 13, name: "Tom Cat", phone: "(555) 010-0113", email: "tom@cartoon.com", avatar: "https://static.wikitide.net/deathbattlewiki/b/b4/Portrait.tomcat.png"},
    {id: 14, name: "Bob Belcher", phone: "(555) 010-0114", email: "bob@cartoon.com", avatar: "https://cdn.costumewall.com/wp-content/uploads/2018/09/bob-belcher.jpg"},
    {id: 15, name: "Charlie Brown", phone: "(555) 010-0115", email: "charlie@cartoon.com", avatar: "https://hopeforwidows.org/wp-content/uploads/2014/07/charliebrown.jpg"},
];

const randomAvatar = [
    "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-29.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-5.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-1.jpg"
];

const getRandomAvatar = (avatarList) => {
    return avatarList[Math.floor(Math.random() * avatarList.length)];
}

const App = () => {
    const [contacts, setContacts] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);     
    const [query, setQuery] = useState("");        
    const [form, setForm] = useState({ name: "", phone: "", email: "" }); 
    const [formErrors, setFormErrors] = useState({}); 
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const contractLoader = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/data/contacts.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setContacts(data);
        } catch (fetchError) {
            console.error("Problem with remote data:", fetchError);
            setError("I have no data xd");
        } finally {
            setLoading(false);
        }
        };
        contractLoader();
    }, []);

    const visibleContacts = useMemo(() => {
        const lower = query.toLowerCase();
        return contacts.filter(
        (contact) => contact.name.toLowerCase().includes(lower) || contact.phone.toLowerCase().includes(lower) );
    }, [contacts, query]);

    function handleSubmit(submit) {
        submit.preventDefault();

        const problems = {};
        if (form.name.trim().length < 2) problems.name = "The name must be at least 2 characters";
        if (!form.phone.trim()) problems.phone = "A phone number is required";
        if (form.email.trim().length > 0 && !form.email.includes("@")) {problems.email = "Email must include a @";}
        if (Object.keys(problems).length > 0) { setFormErrors(problems); return; }

        const userAdd = {id: Date.now(), ...form, avatar: getRandomAvatar(randomAvatar),};
        setContacts([userAdd, ...contacts]);
        setForm({ name: "", phone: "", email: "" });
        setFormErrors({});
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">The Ultimate PhoneBook</h1>
                <p className="page__subtitle">The only site you'll need to find someone</p>
                <img src={nerdlogo} alt="Glasses Nerd" className="mascot"/>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {visibleContacts.length}{" "}
                    {visibleContacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                {selectedContact ? (
                <div className="contact-detail-design">                       
                    {(() => {
                        const currentContactIndex = contacts.findIndex(c => c.id === selectedContact);
                        const totalContacts = contacts.length;
                        const prevContact = contacts[currentContactIndex - 1];
                        const nextContact = contacts[currentContactIndex + 1];
                        const currentContact = contacts[currentContactIndex];                           
                        if (!currentContact) return null; 

                        return (<>
                            <div className="navigation_req">
                                {prevContact && (<button className="btn btn--nav btn--prev" onClick={() => setSelectedContact(prevContact.id)}>← Previous</button>)}
                                <button className="btn btn--back" onClick={() => setSelectedContact(null)}>Back to Grid</button>
                                {nextContact && (<button className="btn btn--nav btn--next" onClick={() => setSelectedContact(nextContact.id)}> Next → </button>)}
                            </div>
                                    
                            <div className="contact-card contact-card__detail">
                                <img className="contact-card__avatar" src={currentContact.avatar} alt={`${currentContact.name}'s avatar`}/>
                                <p className="contact-card__name"><strong>{currentContact.name}</strong></p>
                                <p className="contact-card__phone">Phone: {currentContact.phone}</p>
                                <p className="contact-card__email">Email: {currentContact.email}</p>
                            </div>
                            <p className="page_number">{currentContactIndex + 1} of {totalContacts}</p>
                        </>
                        );
                    })()}
                </div>
                    
                ) : (
                
                <ul className="contacts__grid" data-testid="contacts-list">
                    {/* What this does is it loops through the array and print each of the contact information on it's own line 
                    I used already defined class to make my the default contact index*/}
                    {visibleContacts.map((contact) => (
                        <div key={contact.id} className="contact-card" data-testid={`contact-card-${contact.id}`} onClick={() => setSelectedContact(contact.id)}>
                            <img className="contact-card__avatar" src={contact.avatar} alt={`${contact.name}'s avatar`}/>
                            <p className="contact-card__name"><strong>{contact.name}</strong></p>
                            <p className="contact-card__phone">Phone: {contact.phone}</p>
                            <p className="contact-card__email">Email: {contact.email}</p>
                        </div>
                    ))}
                 </ul>
                )}
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                        {formErrors.name && <p className="validation_error">{formErrors.name}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required                           
                        />
                        {formErrors.phone && <p className="validation_error">{formErrors.phone}</p>}
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        {formErrors.email && <p className="validation_error">{formErrors.email}</p>}
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>                        
                    </div>
                </form>
            </section>

        </main>
    );
};


export default App;
