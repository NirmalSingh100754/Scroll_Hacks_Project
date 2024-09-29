const { useState } = React;

const HomePage = ({ onConsult, onSignOut }) => {
    const [feeling, setFeeling] = useState("");
    const [relatives, setRelatives] = useState([]);
    const [newRelative, setNewRelative] = useState({ name: '', description: '', image: '' });

    const handleConsultClick = async () => {
        const response = await fetch('https://api.blackbox.chat/consult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: feeling })
        });
        const data = await response.json();
        onConsult(data.suggestion);
    };

    const handleAddRelative = () => {
        setRelatives([...relatives, newRelative]);
        setNewRelative({ name: '', description: '', image: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewRelative({ ...newRelative, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="text-white p-4">
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img src="https://placehold.co/50x50" alt="Logo" className="mr-2"/>
                    <span className="text-2xl font-bold">mental</span>
                </div>
                <div className="flex items-center">
                    <button onClick={onSignOut} className="bg-gray-700 p-2 rounded">Sign out</button>
                </div>
            </header>
            {/* Other Sections like feeling input and relatives */}
        </div>
    );
};

const ConsultPage = ({ suggestion }) => {
    return (
        <div className="text-white p-4">
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <img src="https://placehold.co/50x50" alt="Logo" className="mr-2"/>
                    <span className="text-2xl font-bold">mental</span>
                </div>
            </header>
            <section>
                <h2 className="text-xl font-bold mb-2">Blackbox Suggestion</h2>
                <p>{suggestion}</p>
            </section>
        </div>
    );
};

const SignInSignUp = ({ onSignIn }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleSignIn = () => {
        if (email && password) {
            if (!validateEmail(email)) {
                setError('Invalid email format.');
                return;
            }
            if (!validatePassword(password)) {
                setError('Password must be at least 8 characters long, contain a special character, a capital letter, and a number.');
                return;
            }
            onSignIn();
        } else {
            setError('Please fill in all fields.');
        }
    };

    const handleSignUp = () => {
        if (name && email && password) {
            if (!validateEmail(email)) {
                setError('Invalid email format.');
                return;
            }
            if (!validatePassword(password)) {
                setError('Password must be at least 8 characters long, contain a special character, a capital letter, and a number.');
                return;
            }
            onSignIn();
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white text-black p-8 rounded z-10">
                <h2 className="text-xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form>
                    {isSignUp && (
                        <div className="mb-4">
                            <label className="block mb-2">Name</label>
                            <input type="text" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={isSignUp ? handleSignUp : handleSignIn} className="bg-gray-700 text-white p-2 rounded">
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-gray-700">
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </div>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [page, setPage] = useState('home');
    const [suggestion, setSuggestion] = useState('');

    const handleSignIn = () => {
        setIsAuthenticated(true);
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setPage('home');
    };

    const handleConsult = (suggestion) => {
        setSuggestion(suggestion);
        setPage('consult');
    };

    return (
        <div>
            {isAuthenticated ? (
                page === 'home' ? (
                    <HomePage onConsult={handleConsult} onSignOut={handleSignOut} />
                ) : (
                    <ConsultPage suggestion={suggestion} />
                )
            ) : (
                <div>
                    <div className="blurred">
                        <HomePage onConsult={handleConsult} onSignOut={handleSignOut} />
                    </div>
                    <SignInSignUp onSignIn={handleSignIn} />
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
