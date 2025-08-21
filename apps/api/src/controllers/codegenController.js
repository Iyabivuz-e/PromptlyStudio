exports.generateCode = (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Ici tu peux intégrer ton codegen logic
  const generatedCode = `// Code généré pour: ${prompt}`;

  res.json({ code: generatedCode });
};
