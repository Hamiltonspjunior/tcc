import Vue from 'vue'
import Router from 'vue-router'
import CadAluno from './components/cadastro_aluno'
import CadCurso from './components/cadastro_curso'
import ListCurso from './components/lista_cursos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Vue',
      component: Vue
    },
    {
      path: '/cadastro-aluno',
      name: 'Cadastro-Aluno',
      component: CadAluno
    },
    {
      path: '/cadastro-curso',
      name: 'Cadastro-Curso',
      component: CadCurso
    },
    {
      path: '/lista-de-cursos',
      name: 'Lista-de-cursos',
      component: ListCurso
    }
  ]
})