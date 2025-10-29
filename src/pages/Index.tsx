import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [messages, setMessages] = useState([
    { id: 1, author: 'Алиса К.', text: 'Привет всем! Кто сделал домашку по математике?', time: '14:23', avatar: 'AK' },
    { id: 2, author: 'Максим П.', text: 'Я уже сделал! Могу помочь с задачей №5', time: '14:25', avatar: 'МП' },
    { id: 3, author: 'Лена С.', text: 'Спасибо! У меня как раз проблемы с ней 😅', time: '14:27', avatar: 'ЛС' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const schedule = [
    { day: 'Понедельник', lessons: ['Математика', 'Русский язык', 'Английский', 'Физкультура', 'История'] },
    { day: 'Вторник', lessons: ['Литература', 'Алгебра', 'Физика', 'География', 'ИЗО'] },
    { day: 'Среда', lessons: ['Биология', 'Русский язык', 'Химия', 'Английский', 'Музыка'] },
    { day: 'Четверг', lessons: ['История', 'Математика', 'Технология', 'Технология', 'Физкультура'] },
    { day: 'Пятница', lessons: ['Обществознание', 'Литература', 'Английский', 'Информатика', 'Классный час'] }
  ];

  const teachers = [
    { name: 'Иванова М.А.', subject: 'Математика', phone: '+7 (999) 123-45-67', email: 'ivanova@school.ru' },
    { name: 'Петров С.И.', subject: 'Русский язык', phone: '+7 (999) 234-56-78', email: 'petrov@school.ru' },
    { name: 'Смирнова Е.В.', subject: 'Английский', phone: '+7 (999) 345-67-89', email: 'smirnova@school.ru' }
  ];

  const classmates = [
    { name: 'Алиса К.', phone: '+7 (999) 111-11-11', avatar: 'AK' },
    { name: 'Максим П.', phone: '+7 (999) 222-22-22', avatar: 'МП' },
    { name: 'Лена С.', phone: '+7 (999) 333-33-33', avatar: 'ЛС' },
    { name: 'Дима Т.', phone: '+7 (999) 444-44-44', avatar: 'ДТ' },
    { name: 'Катя В.', phone: '+7 (999) 555-55-55', avatar: 'КВ' }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        author: 'Ты',
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'Я'
      }]);
      setNewMessage('');
    }
  };

  const navigationItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'chat', label: 'Чат класса', icon: 'MessageSquare' },
    { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
    { id: 'contacts', label: 'Контакты', icon: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1f1f1f] to-[#0a0a0a]">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              5Н Класс
            </h1>
            <div className="hidden md:flex gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className={`transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon name={item.icon as any} className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="md:hidden flex gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setActiveSection(item.id)}
                  className={activeSection === item.id ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                >
                  <Icon name={item.icon as any} className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {activeSection === 'home' && (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border border-white/10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5"></div>
              <div className="relative z-10">
                <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Добро пожаловать!
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Это наше пространство для общения, обмена идеями и совместной учёбы. Здесь ты всегда найдёшь поддержку одноклассников! 🚀
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Общий чат', desc: 'Обсуждай уроки и общайся', icon: 'MessageSquare', color: 'from-primary to-primary/60', section: 'chat' },
                { title: 'Расписание', desc: 'Не пропусти важные уроки', icon: 'Calendar', color: 'from-secondary to-secondary/60', section: 'schedule' },
                { title: 'Контакты', desc: 'Всегда на связи с классом', icon: 'Users', color: 'from-accent to-accent/60', section: 'contacts' }
              ].map((card, idx) => (
                <Card
                  key={idx}
                  onClick={() => setActiveSection(card.section)}
                  className="group relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 border-white/10 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:animate-glow`}>
                      <Icon name={card.icon as any} className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-card/80 to-card/40 border-white/10 p-6 backdrop-blur-sm">
              <h3 className="font-heading text-2xl font-semibold mb-4 flex items-center">
                <Icon name="Trophy" className="mr-3 h-6 w-6 text-accent" />
                Последние события
              </h3>
              <div className="space-y-3">
                {[
                  { text: 'Контрольная по математике в пятницу', badge: 'Важно', badgeColor: 'bg-destructive' },
                  { text: 'Экскурсия в музей 15 числа', badge: 'Событие', badgeColor: 'bg-accent' },
                  { text: 'Родительское собрание 20 числа', badge: 'Инфо', badgeColor: 'bg-primary' }
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-sm">{event.text}</span>
                    <Badge className={`${event.badgeColor} text-white`}>{event.badge}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'chat' && (
          <Card className="bg-gradient-to-br from-card/80 to-card/40 border-white/10 backdrop-blur-sm max-w-4xl mx-auto animate-scale-in">
            <div className="p-6 border-b border-white/10">
              <h2 className="font-heading text-2xl font-bold flex items-center">
                <Icon name="MessageSquare" className="mr-3 h-6 w-6 text-primary" />
                Общий чат класса
              </h2>
            </div>
            <ScrollArea className="h-[500px] p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 animate-fade-in">
                    <Avatar className="h-10 w-10 border-2 border-primary/30">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {msg.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-6 border-t border-white/10">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Напиши сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className="min-h-[60px] bg-muted/30 border-white/10 focus:border-primary resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 h-[60px] px-6"
                >
                  <Icon name="Send" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {activeSection === 'schedule' && (
          <div className="max-w-5xl mx-auto animate-scale-in">
            <h2 className="font-heading text-3xl font-bold mb-6 flex items-center">
              <Icon name="Calendar" className="mr-3 h-8 w-8 text-secondary" />
              Расписание уроков
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedule.map((day, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-card/80 to-card/40 border-white/10 p-5 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <h3 className="font-heading text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {day.day}
                  </h3>
                  <ol className="space-y-2">
                    {day.lessons.map((lesson, lessonIdx) => (
                      <li key={lessonIdx} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-xs font-semibold">
                          {lessonIdx + 1}
                        </span>
                        <span className="text-sm">{lesson}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-scale-in">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 flex items-center">
                <Icon name="GraduationCap" className="mr-3 h-8 w-8 text-accent" />
                Учителя
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((teacher, idx) => (
                  <Card
                    key={idx}
                    className="bg-gradient-to-br from-card/80 to-card/40 border-white/10 p-5 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                        <Icon name="User" className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{teacher.name}</h3>
                        <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Phone" className="h-4 w-4" />
                        <span>{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Mail" className="h-4 w-4" />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold mb-6 flex items-center">
                <Icon name="Users" className="mr-3 h-8 w-8 text-primary" />
                Одноклассники
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {classmates.map((classmate, idx) => (
                  <Card
                    key={idx}
                    className="bg-gradient-to-br from-card/80 to-card/40 border-white/10 p-4 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-center"
                  >
                    <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-primary/30">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg">
                        {classmate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-2">{classmate.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Phone" className="h-3 w-3" />
                      <span className="truncate">{classmate.phone}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 5Н Класс • Вместе мы сильнее! 🚀</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
