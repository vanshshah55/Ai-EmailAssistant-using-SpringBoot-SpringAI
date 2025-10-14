import { useState } from 'react'
import './App.css'
import './index.css';
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography, Paper, ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#64748b',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: '#2563eb',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#eff6ff',
          },
        },
      },
    },
  },
});

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [customTone, setCustomTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone: tone === 'custom' ? customTone : tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper 
          elevation={0} 
          className="glass-effect"
          sx={{ 
            p: 4, 
            borderRadius: 3,
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <EmailIcon sx={{ fontSize: 40, color: '#60a5fa', mr: 2 }} />
            <Typography variant='h4' component="h1" sx={{ fontWeight: 600, color: '#fff' }}>
              Email Reply Generator
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField 
              className="input-transition"
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              label="Original Email Content"
              value={emailContent || ''}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: '#94a3b8' }}>Tone (Optional)</InputLabel>
              <Select
                className="input-transition"
                value={tone || ''}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
                <MenuItem value="custom">Custom Tone</MenuItem>
              </Select>
            </FormControl>

            {tone === 'custom' && (
              <TextField
                className="input-transition"
                fullWidth
                label="Enter Custom Tone"
                variant="outlined"
                value={customTone}
                onChange={(e) => setCustomTone(e.target.value)}
                placeholder="e.g., Empathetic, Formal, Enthusiastic"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              />
            )}

            <Button
              className="button-hover"
              variant='contained'
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                textTransform: 'none',
                fontSize: '1.1rem',
              }}>
              {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }}/> : "Generate Reply"}
            </Button>
          </Box>

          {error && (
            <Typography 
              className="input-transition"
              color='error' 
              sx={{ 
                mb: 3, 
                p: 2, 
                backgroundColor: 'rgba(254, 226, 226, 0.1)', 
                borderRadius: 1,
                color: '#ef4444'
              }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Paper 
              elevation={0}
              className="glass-effect input-transition"
              sx={{ 
                p: 3, 
                borderRadius: 2,
              }}>
              <Typography variant='h6' gutterBottom sx={{ color: '#fff', fontWeight: 500 }}>
                Generated Reply
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                value={generatedReply || ''}
                inputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
            
              <Button
                className="button-hover"
                variant='outlined'
                startIcon={<ContentCopyIcon />}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
                sx={{
                  textTransform: 'none',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  }
                }}>
                Copy to Clipboard
              </Button>
            </Paper>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default App