import { computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Composable para manejar notificaciones push nativas
 */
export function useNotifications() {
  const router = useRouter()

  const isSupported = computed(() => 'Notification' in window)

  /**
   * Solicitar permiso para mostrar notificaciones
   */
  const requestPermission = async (): Promise<boolean> => {
    console.log('🔔 Verificando soporte de notificaciones...')

    if (!isSupported.value) {
      console.warn('❌ Las notificaciones no están soportadas en este navegador')
      return false
    }

    console.log('✅ Notificaciones soportadas')
    console.log('📋 Permiso actual:', Notification.permission)

    if (Notification.permission === 'granted') {
      console.log('✅ Permiso ya otorgado')
      return true
    }

    if (Notification.permission !== 'denied') {
      console.log('🙋 Solicitando permiso al usuario...')
      const permission = await Notification.requestPermission()
      console.log('📝 Respuesta del usuario:', permission)
      return permission === 'granted'
    }

    console.warn('❌ Permiso denegado previamente')
    return false
  }

  /**
   * Obtener la ruta base de la aplicación
   */
  const getBasePath = () => {
    return import.meta.env.BASE_URL || '/'
  }

  /**
   * Obtener la URL completa del icono
   */
  const getIconUrl = () => {
    const basePath = getBasePath()
    return `${window.location.origin}${basePath}icons/icon-192x192.png`
  }

  /**
   * Mostrar notificación de bienvenida
   */
  const showWelcomeNotification = async () => {
    const hasPermission = await requestPermission()
    if (!hasPermission) {
      console.log('Permiso de notificaciones denegado')
      return
    }

    try {
      const notification = new Notification('Bienvenido a Math Mass', {
        body: 'Te sugerimos empezar a aprender con la leccion de fracciones.',
        icon: getIconUrl(),
        tag: 'welcome',
        requireInteraction: false,
      })

      notification.onclick = () => {
        window.focus()
        router.push('/fracciones')
        notification.close()
      }

      console.log('Notificación de bienvenida mostrada')
    } catch (error) {
      console.error('Error mostrando notificación:', error)
    }
  }

  /**
   * Mostrar notificación según el resultado del examen
   * @param score Puntuación de 0 a 100
   */
  const showExamResultNotification = async (score: number) => {
    const hasPermission = await requestPermission()
    if (!hasPermission) {
      console.log('Permiso de notificaciones denegado')
      return
    }

    let title = ''
    let body = ''

    if (score === 100) {
      title = 'Perfecto - 100%'
      body =
        'Excelente trabajo. Has dominado completamente este tema. Continua con el siguiente nivel.'
    } else if (score >= 80) {
      title = 'Aprobado - ' + score + '%'
      body = 'Muy bien hecho. Has aprobado la evaluacion. Sigue practicando para mejorar aun mas.'
    } else if (score >= 50) {
      title = 'No aprobado - ' + score + '%'
      body = 'Casi lo logras. Repasa los conceptos y vuelve a intentarlo. Puedes hacerlo mejor.'
    } else if (score >= 25) {
      title = 'Necesitas mejorar - ' + score + '%'
      body = 'Te recomendamos revisar las lecciones nuevamente antes de intentar otro examen.'
    } else {
      title = 'Intenta de nuevo - ' + score + '%'
      body =
        'No te desanimes. Estudia las lecciones con calma y practica mas antes de la proxima evaluacion.'
    }

    try {
      const notification = new Notification(title, {
        body,
        icon: getIconUrl(),
        tag: 'exam-result',
        requireInteraction: true,
      })

      notification.onclick = () => {
        window.focus()
        if (score >= 80) {
          router.push('/home')
        } else {
          router.push('/fracciones')
        }
        notification.close()
      }

      console.log('Notificación de resultado mostrada:', score + '%')
    } catch (error) {
      console.error('Error mostrando notificación:', error)
    }
  }

  /**
   * Mostrar notificación cuando inicia un examen
   */
  const showExamStartNotification = async () => {
    const hasPermission = await requestPermission()
    if (!hasPermission) {
      console.log('Permiso de notificaciones denegado')
      return
    }

    try {
      new Notification('Evaluacion iniciada', {
        body: 'Tienes 10 preguntas para demostrar tu conocimiento. Necesitas 80% para aprobar.',
        icon: getIconUrl(),
        tag: 'exam-start',
        requireInteraction: false,
      })

      console.log('Notificación de inicio de examen mostrada')
    } catch (error) {
      console.error('Error mostrando notificación:', error)
    }
  }

  return {
    isSupported,
    requestPermission,
    showWelcomeNotification,
    showExamResultNotification,
    showExamStartNotification,
  }
}
