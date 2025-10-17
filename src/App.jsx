import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {id: 1, name: "Winnie Pooh", phone: "(555) 010-0101", email: "winne@cartoon.com", },
    {id: 2, name: "Buzz Lightyear", phone: "(555) 010-0102", email: "buzz@cartoon.com", },
    {id: 3, name: "Pink Panther", phone: "(555) 010-0103", email: "pink@cartoon.com", },
    {id: 4, name: "Mickey Mouse", phone: "(555) 010-0104", email: "mickey@cartoon.com", },
    {id: 5, name: "Homer Simpson", phone: "(555) 010-0105", email: "homer@cartoon.com", },
    {id: 6, name: "Peter Griffin", phone: "(555) 010-0106", email: "peter@cartoon.com", },
    {id: 7, name: "Bugs Bunny", phone: "(555) 010-0107", email: "bugs@cartoon.com", },
    {id: 8, name: "Ash Ketchum", phone: "(555) 010-0108", email: "ash@cartoon.com", },
    {id: 9, name: "Patrick Star", phone: "(555) 010-0109", email: "patrick@cartoon.com", },
    {id: 10, name: "Daffy Duck", phone: "(555) 010-0110", email: "daffy@cartoon.com", },
    {id: 11, name: "Scooby Doo", phone: "(555) 010-0111", email: "scooby@cartoon.com", },
    {id: 12, name: "Jerry Mouse", phone: "(555) 010-0112", email: "jerry@cartoon.com", },
    {id: 13, name: "Tom Cat", phone: "(555) 010-0113", email: "tom@cartoon.com", },
    {id: 14, name: "Bob Belcher", phone: "(555) 010-0114", email: "bob@cartoon.com", },
    {id: 15, name: "Charlie Brown", phone: "(555) 010-0115", email: "charlie@cartoon.com", },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">The Ultimate PhoneBook</h1>
                <p className="page__subtitle">The only site you'll need to find someone</p>
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
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
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
