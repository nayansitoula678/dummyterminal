import { useState, useEffect, useRef } from 'react';
import '../styles/Terminal.css';

const Terminal = () => {
    return
   
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = 'Available commands: help, about, projects, clear';
        break;
      case 'about':
        output = 'I am a dummy terminal built using Next.js and CSS!';
        break;
      case 'projects':
        output = '1. Portfolio Website\n2. Todo App\n3. Dummy Terminal';
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="terminal-container">
      {history.map((item, idx) => (
        <div key={idx} className="terminal-line">
          <p className="terminal-command"> {item.cmd}</p>
          <pre className="terminal-output">{item.output}</pre>
        </div>
      ))}
      <form onSubmit={onSubmit} className="terminal-form">
        <span className="prompt-symbol">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          className="terminal-input"
        />
      </form>
      <div ref={terminalEndRef} />
    </div>
  );

};

export default Terminal;
