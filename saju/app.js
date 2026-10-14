'use strict';
const $=id=>document.getElementById(id);
const GAN='甲乙丙丁戊己庚辛壬癸', ZHI='子丑寅卯辰巳午未申酉戌亥', KGAN='갑을병정무기경신임계', KZHI='자축인묘진사오미신유술해';
const ELEMENTS=['목','화','토','금','수'], COLORS=['#648b63','#c36c52','#bba15d','#89999e','#5e849f'];
const GE=[0,0,1,1,2,2,3,3,4,4], ZE=[4,2,0,0,2,1,1,2,3,3,2,4];
const PERSONAL=['성장과 새로운 시도에 관심이 가는 목의 상징입니다. 계획을 작은 행동으로 옮겨보세요.','표현과 교류를 중시하는 화의 상징입니다. 열정과 휴식의 리듬을 함께 살펴보세요.','기반과 신뢰를 중시하는 토의 상징입니다. 꾸준함을 살리되 변화할 여지도 남겨보세요.','기준과 정리를 중시하는 금의 상징입니다. 명확함에 유연한 소통을 더해보세요.','관찰과 배움을 중시하는 수의 상징입니다. 생각을 기록하고 한 가지씩 실행해보세요.'];
const THEMES=[
{title:'동료와 함께 기반을 다지는 해',text:'같은 기운을 만나는 비겁의 흐름입니다. 협업과 자기 기준을 돌아보는 주제로 읽을 수 있습니다.',money:'공동 지출과 개인 지출을 구분하고 예산을 명확히 정해보세요.',work:'동료와 역할을 나누고 자신의 강점을 정리하는 데 집중해보세요.',love:'비교보다 서로의 개성을 존중하는 대화가 도움이 됩니다.',well:'일정이 겹칠 때 휴식 시간을 먼저 확보해보세요.'},
{title:'생각을 밖으로 표현하는 해',text:'내 기운이 다음 기운을 만드는 식상의 흐름입니다. 창작과 표현, 결과물을 만드는 주제로 읽습니다.',money:'새 아이디어는 작은 비용으로 검증하고 지출 기록을 남겨보세요.',work:'배운 것을 글이나 프로젝트로 만들어 보여주세요.',love:'느끼는 마음을 구체적인 말로 전하되 상대의 말도 들어보세요.',well:'활동 시간을 늘릴 때 수면 리듬도 함께 지켜보세요.'},
{title:'자원과 선택을 점검하는 해',text:'내 기운이 제어하는 재성의 흐름입니다. 자원 관리와 우선순위를 살피는 주제로 읽습니다.',money:'수익을 예언하는 의미는 아닙니다. 예산·분산·위험 한도를 점검해보세요.',work:'목표를 수치로 정하고 투입 시간과 결과를 비교해보세요.',love:'시간과 관심을 어떻게 나눌지 함께 이야기해보세요.',well:'성과를 좇느라 식사와 휴식을 건너뛰지 않도록 해보세요.'},
{title:'책임과 기준을 세우는 해',text:'나를 제어하는 관성의 흐름입니다. 책임과 약속, 사회적 역할을 돌아보는 주제로 읽습니다.',money:'계약 조건과 고정비를 꼼꼼히 확인해보세요.',work:'해야 할 일의 범위를 명확히 하고 우선순위를 정해보세요.',love:'기대하는 바를 미리 말하고 무리한 약속은 줄여보세요.',well:'부담이 쌓이면 도움을 요청하고 쉬는 시간을 확보해보세요.'},
{title:'배움과 회복에 힘을 주는 해',text:'나를 돕는 인성의 흐름입니다. 공부와 지원, 내적 기반을 살피는 주제로 읽습니다.',money:'학습 비용은 목적과 예산을 정한 뒤 지출해보세요.',work:'새 기술을 배우고 믿을 만한 조언을 구해보세요.',love:'문제를 바로 해결하기보다 먼저 경청해보세요.',well:'규칙적인 수면과 가벼운 활동으로 생활 리듬을 돌아보세요.'}
];
function relation(day,other){if(day===other)return 0;if((day+1)%5===other)return 1;if((day+2)%5===other)return 2;if((other+2)%5===day)return 3;return 4;}
function korean(pair){return [...pair].map(c=>GAN.includes(c)?KGAN[GAN.indexOf(c)]:KZHI[ZHI.indexOf(c)]).join('');}
function pillars(y,m,d,h,min,sect=2,unknown=false){
 const s=Solar.fromYmdHms(y,m,d,h,min,0),e=s.getLunar().getEightChar();e.setSect(sect);
 const shifted=new Date(Date.UTC(y,m-1,d,h-1,min));
 const boundary=Solar.fromYmdHms(shifted.getUTCFullYear(),shifted.getUTCMonth()+1,shifted.getUTCDate(),shifted.getUTCHours(),min,0).getLunar().getEightChar();
 return {pairs:[boundary.getYear(),boundary.getMonth(),e.getDay(),unknown?null:e.getTime()],solar:s};
}
function escapeHtml(t){return t.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 $('error').textContent='';
 try{
 if(typeof Solar==='undefined')throw Error('계산 파일을 불러오지 못했습니다. 새로고침해주세요.');
 const value=$('date').value;if(!value)throw Error('생년월일을 입력해주세요.');
 const [y,m,d]=value.split('-').map(Number), dt=new Date(Date.UTC(y,m-1,d));
 if(y<1900||y>2100||dt.getUTCMonth()+1!==m||dt.getUTCDate()!==d||value>new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}))throw Error('실제 출생한 날짜를 입력해주세요.');
 const unknown=$('unknown').checked;
 if(!unknown&&!$('time').value)throw Error('출생시간을 입력하거나 시간 미상을 선택해주세요.');
 const [h,min]=unknown?[12,0]:$('time').value.split(':').map(Number);
 const year=Number($('year').value);if(!Number.isInteger(year)||year<1901||year>2099)throw Error('운세 연도는 1901~2099년 사이로 입력해주세요.');
 const result=pillars(y,m,d,h,min,Number($('sect').value),unknown),pairs=result.pairs;
 const counts=[0,0,0,0,0];pairs.filter(Boolean).forEach(p=>{counts[GE[GAN.indexOf(p[0])]]++;counts[ZE[ZHI.indexOf(p[1])]]++;});
 const total=counts.reduce((a,b)=>a+b,0),day=GE[GAN.indexOf(pairs[2][0])];
 const annual=Solar.fromYmd(year,7,1).getLunar().getEightChar().getYear(), annualE=GE[GAN.indexOf(annual[0])],t=THEMES[relation(day,annualE)];
 const name=escapeHtml($('name').value.trim()||'당신');
 const column=pairs.map((p,i)=>'<div class="column"><small>'+['년주','월주','일주','시주'][i]+'</small><strong>'+(p?p[0]+'<br>'+p[1]:'—<br>—')+'</strong><span>'+(p?korean(p):'시간 미상')+'</span></div>').join('');
 let months='';for(let mo=1;mo<=12;mo++){const p=pillars(year,mo,15,12,0).pairs[1],mt=THEMES[relation(day,GE[GAN.indexOf(p[0])])];months+='<div class="month"><strong>'+mo+'월 · '+korean(p)+'</strong><p>'+mt.title.replace('해','흐름')+'</p><p>'+mt.work+'</p></div>';}
 $('result').innerHTML='<div class="card headline"><small>YOUR PERSONAL NOTE · '+year+'</small><h2>'+name+'의 '+year+'년 사주 노트</h2><p>'+korean(annual)+'년 · '+t.title+'</p><p>'+t.text+'</p></div><div class="card"><small>02 / 네 기둥</small><h2>나의 사주팔자</h2><div class="columns">'+column+'</div><p class="note">양력 '+value+' · '+(unknown?'출생시간 미상':$('time').value+' 한국 표준시')+' · 일주는 '+($('sect').value==='2'?'밤 12시':'밤 11시')+' 기준</p><h3>일간 '+korean(pairs[2][0])+' · '+ELEMENTS[day]+'의 기운</h3><p>'+PERSONAL[day]+'</p></div><div class="card"><small>03 / 오행의 균형</small><h2>다섯 기운의 구성</h2>'+ELEMENTS.map((el,i)=>'<div class="barrow"><span>'+el+' ('+['木','火','土','金','水'][i]+')</span><div class="track"><div class="fill" style="width:'+counts[i]/total*100+'%;background:'+COLORS[i]+'"></div></div><span>'+counts[i]+'개</span></div>').join('')+'<p class="note">천간과 지지의 대표 오행을 단순 집계합니다. 지장간·월령 가중치·신강약·용신은 판단하지 않습니다. 없는 오행이 불운을 뜻하지 않습니다.</p></div><div class="card"><small>04 / 올해의 해설</small><h2>'+year+'년, 나를 위한 네 가지 질문</h2><div class="grid">'+[['재물 · 자원',t.money],['직장 · 성장',t.work],['관계 · 소통',t.love],['생활 · 컨디션',t.well]].map(v=>'<div class="mini"><h3>'+v[0]+'</h3><p>'+v[1]+'</p></div>').join('')+'</div><p class="note">일간 오행과 해당 연도 천간의 상생·상극 관계로 생성한 일반 해설입니다. 신살·대운·합충 전체를 종합한 정밀 감정은 아닙니다. 연도 운세는 입춘부터 다음 입춘까지의 기운을 뜻합니다.</p></div><div class="card"><small>05 / 월별 노트</small><h2>한 달씩 살펴보는 흐름</h2><p class="note">양력 매월 15일의 절기 월주를 대표로 사용합니다. 월초·절입 전후에는 월주가 다를 수 있습니다.</p><div class="months">'+months+'</div><div class="actions"><button id="copy" type="button">결과 전체 복사</button><button id="print" type="button" class="secondary">인쇄 · PDF 저장</button></div><p id="copyStatus" role="status" class="note"></p></div>';
 $('print').onclick=()=>window.print();
 $('copy').onclick=async()=>{const text=$('result').innerText;try{await navigator.clipboard.writeText(text);$('copyStatus').textContent='전체 결과를 복사했습니다.';}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();$('copyStatus').textContent=ok?'전체 결과를 복사했습니다.':'복사가 지원되지 않습니다. 결과를 선택하여 복사해주세요.';}};
 if(window.matchMedia('(max-width:760px)').matches)$('result').scrollIntoView({behavior:'smooth',block:'start'});
 }catch(e){$('error').textContent=e.message;$('result').innerHTML='<div class="card empty"><h2>입력값을 확인해주세요</h2><p>오류를 수정한 뒤 다시 조회해주세요.</p></div>';}
}
$('year').value=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Seoul'}).slice(0,4);
$('unknown').onchange=()=>{$('time').disabled=$('unknown').checked;};
$('form').onsubmit=e=>{e.preventDefault();render();};
$('sample').onclick=()=>{$('name').value='예시';$('date').value='1990-05-15';$('time').value='09:30';$('unknown').checked=false;$('time').disabled=false;render();};
