import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { BookOpen, Video, FileText, CheckCircle2, BarChart3, CreditCard, Menu, Search } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur rounded-xl p-4 shadow-sm">
      <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  )
}

function TopNav() {
  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-white/50"><Menu size={20} /></button>
            <div className="font-bold text-lg">EduSaaS</div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm bg-white/70 backdrop-blur rounded-full px-3 py-2 shadow-sm">
            <Search size={16} className="text-gray-500" />
            <input placeholder="Search courses, lessons..." className="bg-transparent outline-none w-64" />
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/60">Sign in</button>
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Get started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative h-[82vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/90 pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
          >
            Build. Teach. Learn. Grow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 text-lg text-gray-600"
          >
            A modern platform for teachers to publish courses and for students to learn, submit assignments, take quizzes, and track progress — all in one place.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-8 flex items-center gap-3">
            <button className="px-5 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800">Create a course</button>
            <button className="px-5 py-3 rounded-lg bg-white text-gray-900 font-medium border border-gray-200 hover:bg-gray-50">Browse catalog</button>
          </motion.div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat icon={BookOpen} label="Courses" value="1,240+" />
            <Stat icon={Video} label="Lessons" value="9,300+" />
            <Stat icon={FileText} label="Assignments" value="3,700+" />
            <Stat icon={CheckCircle2} label="Quizzes" value="1,800+" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
        <Icon size={20} />
      </div>
      <div className="mt-4 font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{desc}</div>
    </div>
  )
}

function DemoCards() {
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/courses`)
        const data = await res.json()
        setCourses(data.items || [])
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {(loading ? Array.from({ length: 3 }) : courses.slice(0, 3)).map((c, i) => (
        <div key={i} className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-100 to-gray-200" />
          <div className="mt-3 font-semibold text-gray-900">{c?.title || 'Sample Course'}</div>
          <div className="text-sm text-gray-600">{c?.description || 'Clean and minimal learning experience'}</div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 rounded bg-gray-50 border border-gray-100">Beginner</span>
            <span className="px-2 py-1 rounded bg-gray-50 border border-gray-100">Design</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <div className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} EduSaaS. All rights reserved.</div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <TopNav />
      <Hero />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon={BookOpen} title="Courses & Lessons" desc="Upload videos, rich content, and organize by modules." />
            <Feature icon={FileText} title="Assignments & Submissions" desc="Collect work, grade, and give feedback with ease." />
            <Feature icon={CheckCircle2} title="Quizzes" desc="Create timed quizzes and auto-grade responses." />
          </div>
          <DemoCards />
        </section>
        <section className="py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon={BarChart3} title="Analytics" desc="Track progress, engagement, and completion rates." />
            <Feature icon={CreditCard} title="Subscriptions" desc="Manage plans and billing with a seamless experience." />
            <Feature icon={Video} title="Smooth UX" desc="Fast, modern UI with an interactive 3D hero." />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
