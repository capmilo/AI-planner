import OpenAI from 'openai';
import { Project } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Solo para desarrollo - en producción usar backend
});

export interface ChatResponse {
  content: string;
  error?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    this.openai = openai;
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async sendMessage(message: string, project: Project): Promise<ChatResponse> {
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        return this.getFallbackResponse(message, project);
      }

      const systemPrompt = this.buildSystemPrompt(project);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No se recibió respuesta de OpenAI');
      }

      return { content };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return {
        content: this.getFallbackResponse(message, project).content,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  private buildSystemPrompt(project: Project): string {
    return `Eres un asistente experto en planificación de proyectos de Inteligencia Artificial. 

CONTEXTO DEL PROYECTO:
- Nombre: ${project.name}
- Objetivo: ${project.objective}
- Herramientas: ${project.tools.join(', ')}

TUS RESPONSABILIDADES:
1. Ayudar con la planificación y estructuración del proyecto
2. Sugerir herramientas y tecnologías apropiadas
3. Resolver dudas técnicas sobre IA y machine learning
4. Proponer pasos y flujos de trabajo
5. Optimizar la arquitectura del proyecto
6. Explicar conceptos complejos de manera clara

ESTILO DE COMUNICACIÓN:
- Responde en español
- Sé conciso pero completo
- Usa ejemplos prácticos cuando sea útil
- Sugiere acciones específicas
- Mantén un tono profesional pero amigable
- Si no estás seguro de algo, dilo claramente

FORMATO DE RESPUESTA:
- Usa viñetas (•) para listas
- Usa **negrita** para términos importantes
- Usa bloques de código para ejemplos técnicos
- Estructura las respuestas de manera clara

NO incluyas información personal o sensible en tus respuestas.`;
  }

  private getFallbackResponse(message: string, project: Project): ChatResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('hello')) {
      return {
        content: `¡Hola! Soy tu asistente de IA para el proyecto "${project.name}". Estoy aquí para ayudarte a planificar, resolver dudas y sugerir ideas para tu proyecto. ¿En qué puedo ayudarte hoy?`
      };
    }
    
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
      return {
        content: `Puedo ayudarte con:\n\n• Planificar pasos del proyecto\n• Sugerir herramientas y tecnologías\n• Resolver dudas técnicas\n• Optimizar tu flujo de trabajo\n• Generar ideas para nuevas funcionalidades\n\n¿En qué área específica necesitas ayuda?`
      };
    }
    
    if (lowerMessage.includes('herramienta') || lowerMessage.includes('tecnología')) {
      return {
        content: `Para tu proyecto "${project.name}", basándome en el objetivo "${project.objective}", te sugiero considerar estas herramientas:\n\n• **Desarrollo**: Python, TensorFlow, PyTorch\n• **Frontend**: React, Vue.js, Angular\n• **Backend**: FastAPI, Django, Flask\n• **Base de datos**: PostgreSQL, MongoDB, Redis\n• **Deployment**: Docker, AWS, Google Cloud\n\n¿Te gustaría que profundice en alguna de estas opciones?`
      };
    }
    
    if (lowerMessage.includes('paso') || lowerMessage.includes('plan')) {
      return {
        content: `Te sugiero estos pasos para tu proyecto:\n\n1. **Análisis de requisitos** - Definir claramente qué debe hacer el sistema\n2. **Diseño de arquitectura** - Planificar la estructura técnica\n3. **Preparación de datos** - Recolectar y limpiar datos de entrenamiento\n4. **Desarrollo del modelo** - Implementar y entrenar el modelo de IA\n5. **Integración** - Conectar el modelo con la aplicación\n6. **Testing** - Validar el funcionamiento\n7. **Deployment** - Desplegar en producción\n\n¿Quieres que profundice en alguno de estos pasos?`
      };
    }
    
    if (lowerMessage.includes('problema') || lowerMessage.includes('error')) {
      return {
        content: `Entiendo que tienes un problema. Para ayudarte mejor, necesito más detalles:\n\n• ¿En qué fase del proyecto estás?\n• ¿Qué error específico estás viendo?\n• ¿Qué herramientas estás usando?\n• ¿Has intentado alguna solución?\n\nCon más contexto podré darte una respuesta más precisa.`
      };
    }
    
    return {
      content: `Interesante pregunta sobre "${message}". Para tu proyecto "${project.name}", te recomiendo considerar cómo esto se alinea con tu objetivo: "${project.objective}". ¿Podrías darme más contexto sobre lo que quieres lograr específicamente?`
    };
  }
}

export default OpenAIService.getInstance();
