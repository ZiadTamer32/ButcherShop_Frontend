import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingBag, Award, Clock, Beef } from "lucide-react";
import heroImage from "../assets/hero-butcher.webp";

const Home = () => {
  const featureSections = [
    {
      icon: Award,
      title: "جودة عالية",
      description: "نختار بعناية أفضل أنواع اللحوم لضمان رضا عملائنا",
    },
    {
      icon: Beef,
      title: "لحوم طازجة",
      description: "لحوم طازجة يومياً لضمان أفضل مذاق و جودة",
    },
    {
      icon: Clock,
      title: "خدمة سريعة",
      description: "نوصل طلباتكم بسرعة وكفاءة عالية",
    },
  ];
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="جزارة أولاد حسن سيد الحداد"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/65 to-background/60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              جزارة أولاد حسن <br />
              <span className="block text-primary mt-2">الحداد</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground mb-8">
              أجود أنواع اللحوم الطازجة والمضمونة. جودة عالية وخدمة ممتازة منذ
              سنوات
            </p>
            <Link to="/products">
              <Button className="gap-3 font-bold text-lg">
                <ShoppingBag className="w-5 h-5" />
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="pt-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">من نحن</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              جزارة أولاد حسن الحداد هي واحدة من أفضل الجزارات في المجال. نفخر
              بتقديم أفضل أنواع اللحوم الطازجة والمضمونة لعملائنا الكرام. نحن
              نؤمن بأن الجودة ليست خياراً بل هي التزام، ولذلك نختار بعناية فائقة
              كل قطعة لحم نقدمها لكم.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              مع سنوات من الخبرة في مجال اللحوم، نحن نعرف ما يبحث عنه عملاؤنا
              ونسعى دائماً لتجاوز توقعاتهم. فريقنا المحترف مستعد دائماً لتقديم
              المشورة ومساعدتكم في اختيار الأنسب لاحتياجاتكم.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {featureSections.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 gradient-card rounded-xl shadow-soft"
              >
                <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="pb-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              تواصل معنا
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              نحن هنا لخدمتكم. تواصل معنا للاستفسار أو الطلب
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="gradient-card p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  الهاتف
                </h3>
                <p className="text-muted-foreground" dir="ltr">
                  02 24314840
                </p>
              </div>
              <div className="gradient-card p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  البريد الإلكتروني
                </h3>
                <Link
                  to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=alhadadbutcher@gmail.com"
                  target="_blank"
                  className="underline text-primary transition-colors"
                >
                  alhadadbutcher@gmail.com
                </Link>
              </div>
              <div className="gradient-card p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  العنوان
                </h3>
                <p className="text-muted-foreground">
                  <span>
                    <Link
                      to="https://www.google.com/maps?q=30.07982,31.2447808&z=17&hl=en"
                      target="_blank"
                      className="underline text-primary transition-colors"
                    >
                      شبرا
                    </Link>
                  </span>{" "}
                  ,القاهرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground">
            © 2025 جزارة أولاد حسن الحداد.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
